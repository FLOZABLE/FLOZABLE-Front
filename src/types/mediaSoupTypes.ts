import {
  DtlsParameters,
  IceCandidate,
  IceParameters,
  MediaKind,
  RtpParameters,
} from "mediasoup-client/types";

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
