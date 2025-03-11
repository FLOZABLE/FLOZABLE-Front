import { io } from "socket.io-client";
import config from "../config";

const mediaSocket = io(config.media_socket, {
  autoConnect: false,
  withCredentials: true,
});

export { mediaSocket };
