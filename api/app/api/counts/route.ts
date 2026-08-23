import { NextResponse } from 'next/server';

export async function GET() {
  const count = (globalThis as any).__REQUEST_COUNT__ || 0;

  return NextResponse.json(
    {
      success: true,
      totalRequests: count,
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}