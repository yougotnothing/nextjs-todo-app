import { PrismaClient } from '@prisma/client';

const prismaClientSingletone = () => new PrismaClient();

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingletone>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingletone();

export default db;

globalThis.prismaGlobal = db;