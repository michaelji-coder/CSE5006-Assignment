import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  // Extract path from process.env.DATABASE_URL or default to ./prisma/dev.db
  const rawUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';
  const dbPath = rawUrl.replace(/^file:/, '');

  const sqlite = new Database(dbPath);
  const adapter = new PrismaBetterSqlite(sqlite);

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;