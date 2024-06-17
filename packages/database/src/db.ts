import { PrismaClient } from "@prisma/client";

// Import process explicitly
declare var process: {
  env: {
    NODE_ENV: string;
  };
};

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Extend the globalThis type
declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

// Assign the PrismaClient instance to a global variable or create a new one
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export const db = prisma;
