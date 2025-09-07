import mediaSocket from "@/lib/sockets/mediaSocket";
import { GroupMember } from "@/types/groupTypes";
import { ServerConsumeResponse } from "@/types/mediaSoupTypes";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { Device } from "mediasoup-client";
import { MediaKind, Transport } from "mediasoup-client/types";
import { useEffect, useRef } from "react";

import { useCallOptions } from "../structure/Providers";
import { Badge } from "../ui/badge";

interface MemberCamDisplayProps {
  member: GroupMember;
  device: Device | null;
  recvTransport: Transport | null;
  media: { audio: boolean; video: boolean };
  setMedia: React.Dispatch<
    React.SetStateAction<{ audio: boolean; video: boolean }>
  >;
}
export default function MemberCamDisplay({
  member,
  device,
  recvTransport,
  media,
  setMedia,
}: MemberCamDisplayProps) {
  const { isHeadphone } = useCallOptions();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const connectRecvTransport = async (kind: MediaKind) => {
    if (!device || !recvTransport) return;
    console.log("new producer");
    // for consumer, we need to tell the server first
    // to create a consumer based on the rtpCapabilities and consume
    // if the router can consume, it will send back a set of params as below
    const targetId = member.user_id;
    mediaSocket.emit(
      "consume",
      {
        rtpCapabilities: device.rtpCapabilities,
        targetId,
        kind,
      },
      async ({ params }: ServerConsumeResponse) => {
        if (params.error) {
          console.log("Cannot Consume");
          return;
        }

        // then consume with the local consumer transport
        // which creates a consumer
        const consumer = await recvTransport.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters,
        });

        // destructure and retrieve the video track from the producer
        const { track } = consumer;

        const stream = new MediaStream([track]);
        if (track.kind === "video") {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setMedia((prev) => ({ ...prev, video: true }));
            console.log("video");
          }
        } else {
          if (audioRef.current) {
            audioRef.current.srcObject = stream;
            setMedia((prev) => ({ ...prev, audio: true }));
          }
        }
        //videoRef.current.srcObject = stream;
        /* stream.addTrack(track); */
        // the server consumer started with media paused
        // so we need to inform the server to resume
        mediaSocket.emit("consumer-resume", { targetId, kind });
      },
    );
  };

  useEffect(() => {
    if (!member || !recvTransport || !device) return;
    mediaSocket.on(`newProducer:${member.user_id}`, connectRecvTransport);

    return () => {
      mediaSocket.off(`newProducer:${member.user_id}`, connectRecvTransport);
    };
  }, [member, recvTransport, device]);

  useEffect(() => {
    if (!member) return;
    const { user_id } = member;

    const onRemoveProducer = (kind: MediaKind) => {
      console.log("remove producer", kind);
      if (kind === "audio") {
        if (audioRef.current) {
          audioRef.current.srcObject = null;
        }
        setMedia((prev) => ({ ...prev, video: false }));
      } else {
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setMedia((prev) => ({ ...prev, video: false }));
      }
    };

    mediaSocket.on(`removeProducer:${user_id}`, onRemoveProducer);

    return () => {
      mediaSocket.off(`removeProducer:${user_id}`, onRemoveProducer);
    };
  }, [member]);

  useEffect(() => {
    if (!audioRef || !audioRef.current) return;

    if (isHeadphone) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isHeadphone]);

  return (
    <div className="w-full h-full pointer-events-none">
      <video
        muted={true}
        ref={videoRef}
        className="absolute-center rotate-y-180"
        autoPlay
        playsInline
        
      />
      <audio ref={audioRef} />
      <div className="flex absolute gap-2 bottom-2 right-2">
        <Badge variant="outline">
          {media.video ? (
            <Video className="size-4" />
          ) : (
            <VideoOff className="size-4" />
          )}
          {media.audio ? (
            <Mic className="size-4" />
          ) : (
            <MicOff className="size-4" />
          )}
        </Badge>
      </div>
    </div>
  );
}
