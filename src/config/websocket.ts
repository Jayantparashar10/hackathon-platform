import { ServerOptions } from "socket.io";

export const websocketConfig: ServerOptions = {
  cors: {
    origin: process.env.NEXTAUTH_URL?.split(",") || "*",
    methods: ["GET", "POST"]
  },
  transports: ["websocket", "polling"],
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: {
    name: "io-token",
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  }
};

export const WS_EVENTS = {
  CONNECTION: "connection",
  JOIN_ROOM: "join-room",
  MESSAGE: "message",
  ERROR: "error",
  DISCONNECT: "disconnect"
} as const;