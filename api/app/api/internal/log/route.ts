import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientId, endpoint, status, feedId } = body;

    await prisma.requestLog.create({
      data: {
        clientId: clientId || '127.0.0.1',
        endpoint: endpoint || '/api',
        status: status || 200,
        feedId: feedId ? parseInt(feedId) : null,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
