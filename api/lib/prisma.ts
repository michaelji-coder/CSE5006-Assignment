import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Pass a dummy adapter-like config during build time to satisfy Prisma 7 validation
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(
    process.env.DATABASE_URL
      ? undefined
      : ({
          adapter: {
            name: 'sqlite',
            provider: 'sqlite',
            executeRaw: async () => {},
            queryRaw: async () => ({ rows: [], columnNames: [] }),
          },
        } as any)
  );

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
