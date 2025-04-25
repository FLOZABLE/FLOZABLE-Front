import { MediaKind, RtpParameters } from "mediasoup-client/lib/RtpParameters";

export interface ServerConsumeResponse {
  params: {
    error?: string;
    id: string;
    producerId: string;
    kind: MediaKind;
    rtpParameters: RtpParameters;
  };
}
