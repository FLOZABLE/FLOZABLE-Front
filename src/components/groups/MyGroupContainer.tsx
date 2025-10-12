import { useAccount } from "@/hooks/accountHooks";
import { useGroupMembers } from "@/hooks/groupHooks";
import { useGroupMembersUpdater } from "@/hooks/updaters/groupUpdaters";
import { ACTIVE_GROUP_DEBOUNCE } from "@/lib/constants";
import mediaSocket from "@/lib/sockets/mediaSocket";
import socket from "@/lib/sockets/socket";
import { secondConverter } from "@/lib/utils";
import { Group } from "@/types/groupTypes";
import { ServerCreateTransportResponse } from "@/types/mediaSoupTypes";
import {
  OnGroupNewMember,
  OnStopStudying,
  OnStudying,
} from "@/types/socketTypes";
import { BookOpen, GraduationCap, LogOut, UserRound } from "lucide-react";
import { Device } from "mediasoup-client";
import {
  DtlsParameters,
  RtpCapabilities,
  RtpParameters,
  Transport,
} from "mediasoup-client/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import ChatButton from "../buttons/ChatButton";
import GroupLeaderboardButton from "../buttons/GroupLeaderboardButton";
import { useCallOptions } from "../structure/Providers";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import MemberContainer from "./MemberContainer";
import MembersStatusViewer from "./MembersStatusViewer";
import { setConfirmLeaveModalType } from "./MyGroupsViewer";

const videoParams = {
  encodings: [
    {
      rid: "r0",
      maxBitrate: 100000,
      scalabilityMode: "S1T3",
    },
    {
      rid: "r1",
      maxBitrate: 300000,
      scalabilityMode: "S1T3",
    },
    {
      rid: "r2",
      maxBitrate: 900000,
      scalabilityMode: "S1T3",
    },
  ],
  codecOptions: {
    videoGoogleStartBitrate: 1000,
  },
};

const audioParams = {
  encodings: [{ maxBitrate: 900000 }],
};
interface MyGroupContainerProps {
  group: Group;
  isActive: boolean;
  isAdmin: boolean;
  setConfirmLeaveModal: React.Dispatch<
    React.SetStateAction<setConfirmLeaveModalType>
  >;
  isStudy?: boolean;
}

export default function MyGroupContainer({
  group,
  isActive,
  setConfirmLeaveModal,
  isStudy,
}: MyGroupContainerProps) {
  const { isCam, isMic } = useCallOptions();
  const { groupMembersData, groupMembersIsLoading } = useGroupMembers(
    group.group_id,
    isActive,
  );
  const { account } = useAccount();

  const [totalTime, setTotalTime] = useState("0 h");

  const [rtpCapabilities, setRtpCapabilities] =
    useState<RtpCapabilities | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [device, setDevice] = useState<Device | null>(null);
  const [recvTransport, setRecvTransport] = useState<Transport | null>(null);
  const [producerTransport, setProducerTransport] = useState<Transport | null>(
    null,
  );

  const updateGroupMembers = useGroupMembersUpdater(group.group_id);

  const router = useRouter();

  useEffect(() => {
    if (!groupMembersData?.length) return;
    const totalTime = groupMembersData.reduce(
      (partialTime, a) => partialTime + a.study_time,
      0,
    );
    const membersAvg = Math.floor(totalTime / groupMembersData.length);
    const formattedValue = secondConverter({ sec: membersAvg });
    setTotalTime(formattedValue);
  }, [groupMembersData]);

  useEffect(() => {
    const onStudying = ({ user_id, subject }: OnStudying) => {
      updateGroupMembers((prev) => {
        const memberIndex = prev.findIndex(
          (member) => member.user_id === user_id,
        );
        if (memberIndex === -1) return prev;

        const newGroupMembers = [...prev];
        newGroupMembers[memberIndex] = {
          ...newGroupMembers[memberIndex],
          status: subject,
        };

        return newGroupMembers;
      });
    };

    const onStopStudying = ({ user_id, status, duration }: OnStopStudying) => {
      updateGroupMembers((prev) => {
        const memberIndex = prev.findIndex(
          (member) => member.user_id === user_id,
        );
        if (memberIndex === -1) return prev;

        const newGroupMembers = [...prev];
        const study_time = newGroupMembers[memberIndex].study_time + duration;
        newGroupMembers[memberIndex] = {
          ...newGroupMembers[memberIndex],
          status,
          study_time,
        };

        return newGroupMembers;
      });
    };

    const onNewMember = ({ member }: OnGroupNewMember) => {
      console.log(member, "new member");
      updateGroupMembers((prev) => [...prev, member]);
    };

    if (!isActive) {
      socket.off("study:start", onStudying);
      socket.off("study:stop", onStopStudying);
      socket.off("group:new_member", onNewMember);
      return;
    }

    socket.on("study:start", onStudying);
    socket.on("study:stop", onStopStudying);
    socket.on("group:new_member", onNewMember);

    return () => {
      socket.off("study:start", onStudying);
      socket.off("study:stop", onStopStudying);
      socket.off("group:new_member", onNewMember);
    };
  }, [isActive]);

  useEffect(() => {}, []);

  const getRouterRtpCapabilities =
    useCallback(async (): Promise<RtpCapabilities> => {
      return new Promise((resolve, reject) => {
        mediaSocket.emit(
          "getRouterRtpCapabilities",
          ({ rtpCapabilities }: { rtpCapabilities: RtpCapabilities }) => {
            if (rtpCapabilities) {
              console.log("SFU: get rtp capabilities", rtpCapabilities);
              setRtpCapabilities(rtpCapabilities);
              resolve(rtpCapabilities);
            } else {
              reject(new Error("Failed to get RTP capabilities"));
            }
          },
        );
      });
    }, []);

  const createDevice = async () => {
    try {
      const newDevice = new Device();
      await newDevice.load({ routerRtpCapabilities: rtpCapabilities! });
      setDevice(newDevice);
      console.log("SFU: device", newDevice);
    } catch (error: any) {
      console.log(error);
      if (error.name === "UnsupportedError") {
        console.error("Browser not supported");
      }
    }
  };

  const createRecvTransport = async () => {
    mediaSocket.emit(
      "createTransport",
      { sender: false },
      async ({ params }: ServerCreateTransportResponse) => {
        if (params.error) {
          console.log(params.error);
          return;
        }

        const transport = device!.createRecvTransport(params); // No await needed here
        console.log("SFU: create recv transport", transport);

        transport.on("connectionstatechange", (state) => {
          if (state === "connected") {
            console.log("SFU: Recv transport is connected!");
            // Now that the transport is ready, it's safe to get producers
          }
        });

        setTimeout(() => {
          mediaSocket.emit("getRoomProducers");
          console.log("SFU: get producers");
        }, ACTIVE_GROUP_DEBOUNCE + 500);

        await transport.on(
          "connect",
          async (
            { dtlsParameters }: { dtlsParameters: DtlsParameters },
            callback: () => void,
            errback: (error: Error) => void,
          ) => {
            console.log("SFU: transport connect");
            try {
              mediaSocket.emit("transport-recv-connect", {
                dtlsParameters,
              });
              callback();
            } catch (error: any) {
              errback(error);
            }
          },
        );

        setRecvTransport(transport);
      },
    );
  };

  const createSendTransport = async () => {
    console.log("createSendTransport");
    mediaSocket.emit(
      "createTransport",
      { sender: true },
      async ({ params }: ServerCreateTransportResponse) => {
        if (params.error) {
          console.log(params.error);
          return;
        }

        const transport = await device!.createSendTransport(params);

        await transport.on(
          "connect",
          async (
            { dtlsParameters }: { dtlsParameters: DtlsParameters },
            callback: () => void,
            errback: (error: Error) => void,
          ) => {
            try {
              await mediaSocket.emit("transport-connect", { dtlsParameters });
              callback();
            } catch (error: any) {
              errback(error);
            }
          },
        );

        await transport.on(
          "produce",
          async (
            parameters: { kind: string; rtpParameters: RtpParameters },
            callback: (response: { id: string }) => void,
            errback: (error: Error) => void,
          ) => {
            const { kind, rtpParameters } = parameters;

            try {
              mediaSocket.emit(
                "transport-produce",
                { kind, rtpParameters },
                ({ id }: { id: string }) => {
                  callback({ id });
                },
              );
            } catch (error: any) {
              errback(error);
            }
          },
        );

        setProducerTransport(transport);
      },
    );
  };

  const transportProduce = async () => {
    const track = videoStream?.getVideoTracks()[0];
    if (!track || !producerTransport) return;

    const localProducer = await producerTransport.produce({
      track,
      ...videoParams,
    });

    localProducer.on("trackended", () => {
      console.log("video track ended");
    });
    localProducer.on("transportclose", () => {
      console.log("video transport ended");
    });

    console.log("SFU: local video producer", localProducer, track);
  };

  const audioTransportProduce = async () => {
    const track = audioStream?.getAudioTracks()[0];
    if (!track || !producerTransport) return;

    const localProducer = await producerTransport.produce({
      track,
      ...audioParams,
    });

    localProducer.on("trackended", () => {
      console.log("audio track ended");
    });
    localProducer.on("transportclose", () => {
      console.log("audio transport ended");
    });

    console.log("local audio producer", localProducer);
  };

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(async () => {
      console.log("isactive:", isActive);
      if (!isActive) return;
      const rtp = await getRouterRtpCapabilities();
      console.log(rtp);
      if (rtp) clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);

  useEffect(() => {
    if (rtpCapabilities) createDevice();
  }, [rtpCapabilities]);

  useEffect(() => {
    if (device) {
      setTimeout(() => {
        createRecvTransport();
        createSendTransport();
      }, ACTIVE_GROUP_DEBOUNCE + 500);
    }
  }, [device]);

  useEffect(() => {
    if (isCam && isActive) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { min: 640, max: 1920 },
            height: { min: 400, max: 1080 },
          },
        })
        .then((stream) => setVideoStream(stream))
        .catch((err) => console.log(err));
    } else {
      videoStream?.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
      mediaSocket.emit("removeMyProducer", { kind: "video" });
    }

    return () => {
      videoStream?.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
      mediaSocket.emit("removeMyProducer", { kind: "video" });
    };
  }, [isCam, isActive]);

  useEffect(() => {
    if (isMic && isActive) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => setAudioStream(stream))
        .catch((err) => console.log(err));
    } else {
      audioStream?.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
      mediaSocket.emit("removeMyProducer", { kind: "audio" });
    }

    return () => {
      audioStream?.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
      mediaSocket.emit("removeMyProducer", { kind: "audio" });
    };
  }, [isMic, isActive]);

  useEffect(() => {
    if (producerTransport && videoStream) {
      transportProduce();
    }
  }, [producerTransport, videoStream]);

  useEffect(() => {
    if (producerTransport && audioStream) {
      audioTransportProduce();
    }
  }, [producerTransport, audioStream]);

  return (
    <Card className="h-full border-0 py-0 bg-transparent relative shadow-none">
      <MembersStatusViewer members={groupMembersData} />
      <CardHeader>
        {isStudy ? (
          <CardTitle>
            <Badge className="text-xl" variant={"default"}>
              {group.name}
            </Badge>
          </CardTitle>
        ) : (
          <CardTitle>{group.name}</CardTitle>
        )}
        <CardDescription>
          <div className="flex gap-2">
            <Badge variant={"secondary"}>
              <UserRound />
              {groupMembersIsLoading
                ? group.members.length
                : groupMembersData?.length}
            </Badge>
            <Badge variant={"secondary"}>
              <BookOpen />
              {totalTime}
            </Badge>
            <ChatButton groupId={group.group_id} />
            <GroupLeaderboardButton groupId={group.group_id} />
            <Button
              onClick={() => {
                setConfirmLeaveModal((prev) => ({
                  ...prev,
                  open: true,
                  group,
                }));
              }}>
              <LogOut />
            </Button>
            {!isStudy && (
              <Button
                onClick={() => {
                  router.push(`/dashboard/study?study_group=${group.group_id}`);
                }}
                icon={GraduationCap}
                iconPlacement="right">
                Go Study
              </Button>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto h-full">
        <div className="grid grid-cols-[repeat(auto-fill,_15rem)] gap-4 justify-center">
          {isActive && !groupMembersIsLoading
            ? groupMembersData?.map((member, i) => {
                return (
                  <MemberContainer
                    member={member}
                    recvTransport={recvTransport}
                    device={device}
                    isMe={account?.user_id === member.user_id}
                    key={i}
                  />
                );
              })
            : group.members.map((_, i) => (
                <Skeleton className="h-32 !rounded-xl" key={i} />
              ))}
        </div>
      </CardContent>
    </Card>
  );
}
