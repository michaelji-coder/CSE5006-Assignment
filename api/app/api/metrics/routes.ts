import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Total Requests
    const totalRequests = await prisma.requestLog.count();

    // 2. RSS Feed Count
    const feedCount = await prisma.rssFeed.count();

    // 3. Unique Clients
    const uniqueClientsResult = await prisma.requestLog.groupBy({
      by: ['clientId'],
    });
    const uniqueClientsCount = uniqueClientsResult.length;

    // 4. Requests per Client Breakdown
    const requestsPerClientRaw = await prisma.requestLog.groupBy({
      by: ['clientId'],
      _count: { id: true },
    });
    const requestsPerClient = requestsPerClientRaw.map((item) => ({
      clientId: item.clientId,
      count: item._count.id,
    }));

    // 5. Requests per Feed Breakdown
    const requestsPerFeedRaw = await prisma.requestLog.groupBy({
      by: ['feedId'],
      _count: { id: true },
      where: { feedId: { not: null } },
    });

    const feeds = await prisma.rssFeed.findMany({
      select: { id: true, title: true },
    });

    const requestsPerFeed = requestsPerFeedRaw.map((item) => {
      const matchedFeed = feeds.find((f) => f.id === item.feedId);
      return {
        feedId: item.feedId,
        feedTitle: matchedFeed ? matchedFeed.title : 'Unknown Feed',
        count: item._count.id,
      };
    });

    // 6. Feed Status Summaries
    const errorLogsCount = await prisma.requestLog.count({
      where: { status: { gte: 400 } },
    });

    return NextResponse.json(
      {
        totalRequests,
        feedCount,
        uniqueClientsCount,
        errorLogsCount,
        requestsPerClient,
        requestsPerFeed,
        statusSummary: {
          healthy: errorLogsCount === 0,
          systemStatus: errorLogsCount > 10 ? 'Degraded' : 'Healthy',
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to generate metrics', details: error.message },
      { status: 500 }
    );
  }
}