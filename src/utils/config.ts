interface ConfigType {
  server: string;
  static_server: string;
  next_server: string;
  media_socket: string;
  spotify_client_id: string;
  google_client_id: string;
  google_analytics_id: string;
}

const config = <ConfigType>{
  server: process.env.NEXT_PUBLIC_SERVER,
  static_server: process.env.NEXT_PUBLIC_STATIC_SERVER,
  next_server: process.env.NEXT_PUBLIC_NEXT_SERVER,
  media_socket: process.env.NEXT_PUBLIC_MEDIA_SOCKET,
  spotify_client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  google_analytics_id: process.env.NEXT_PUBLIC_GA_ID,
};

export default config;
