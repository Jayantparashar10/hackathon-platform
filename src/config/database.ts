import mongoose from "mongoose";

export const dbConnection = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI!);
  return connection;
};

export const dbDisconnect = async () => {
  await mongoose.disconnect();
};

export const mongooseOptions: mongoose.ConnectOptions = {
  autoIndex: process.env.NODE_ENV !== "production",
  maxPoolSize: 10,
  minPoolSize: 5,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 75000
};

export const COLLECTION_NAMES = {
  USERS: "users",
  TEAMS: "teams",
  HACKATHONS: "hackathons",
  MESSAGES: "messages"
} as const;
