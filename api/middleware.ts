import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Identify the client (IP or header fallback)
  const clientId =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('user-agent') ||
    '127.0.0.1';

  const response = NextResponse.next();

  // Log API requests to the database, ignoring Next.js static assets and internal log calls
  if (
    pathname.startsWith('/api') &&
    !pathname.startsWith('/api/internal') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/favicon.ico')
  ) {
    const logUrl = new URL('/api/internal/log', request.url);

    // Send log asynchronously so user response time isn't delayed
    fetch(logUrl.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId,
        endpoint: pathname,
        status: 200,
      }),
    }).catch((err) => console.error('Request logging error:', err));
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};