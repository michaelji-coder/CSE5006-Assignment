import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


const corsHeaders = {
  'Access-Control-Allow-Origin': '*', 
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};


export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const feeds = await prisma.rssFeed.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      { success: true, count: feeds.length, data: feeds },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error fetching feeds:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve RSS feeds' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, author, imageUrl, link } = body;

    // Validation
    if (!title || !description || !author) {
      return NextResponse.json(
        { success: false, error: 'Title, description, and author are required.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const newFeed = await prisma.rssFeed.create({
      data: {
        title,
        description,
        author,
        imageUrl: imageUrl && imageUrl.trim() !== '' ? imageUrl : undefined,
        link: link && link.trim() !== '' ? link : undefined,
      },
    });

    return NextResponse.json(
      { success: true, message: 'RSS feed created successfully', data: newFeed },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error creating feed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to persist RSS feed item' },
      { status: 500, headers: corsHeaders }
    );
  }
}