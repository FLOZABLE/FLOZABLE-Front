import { MediaKind, RtpParameters } from "mediasoup-client/lib/RtpParameters";
import {
  DtlsParameters,
  IceCandidate,
  IceParameters,
} from "mediasoup-client/lib/Transport";

export interface ServerConsumeResponse {
  params: {
    error?: string;
    id: string;
    producerId: string;
    kind: MediaKind;
    rtpParameters: RtpParameters;
  };
}

export interface ServerCreateTransportResponse {
  params: {
    error?: string;
    id: string;
    iceParameters: IceParameters;
    iceCandidates: IceCandidate[];
    dtlsParameters: DtlsParameters;
  };
}
