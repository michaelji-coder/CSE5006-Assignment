import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Prevents Prisma 7 from throwing adapter errors during static page generation
    datasourceUrl: process.env.DATABASE_URL || 'file:./dev.db',
  } as any);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
