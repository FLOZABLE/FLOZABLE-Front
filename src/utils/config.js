"use client";

const config = {
  server: process.env.NEXT_PUBLIC_SERVER,
  static_server: process.env.NEXT_PUBLIC_STATIC_SERVER,
  next_server: process.env.NEXT_PUBLIC_NEXT_SERVER,
  media_socket: process.env.NEXT_PUBLIC_MEDIA_SOCKET,
  spotify_client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};

export default config;
