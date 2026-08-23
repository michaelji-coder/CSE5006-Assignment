import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const feedId = parseInt(id, 10);
    const feed = await prisma.rssFeed.findUnique({
      where: { id: feedId },
    });

    if (!feed) {
      return NextResponse.json(
        { success: false, error: 'Feed item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: feed }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid feed ID' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const feedId = parseInt(id, 10);
    await prisma.rssFeed.delete({
      where: { id: feedId },
    });

    return NextResponse.json(
      { success: true, message: `Feed ${feedId} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete feed item' },
      { status: 500 }
    );
  }
}