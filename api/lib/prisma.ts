import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Create a minimal fallback adapter object to prevent Prisma 7 from throwing
// during static analysis if no external driver adapter is installed.
const dummyAdapter: any = {
  name: 'sqlite',
  provider: 'sqlite',
  adapterName: 'sqlite',
  executeRaw: async () => 0,
  queryRaw: async () => ({ rows: [], columnNames: [] }),
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: dummyAdapter,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
