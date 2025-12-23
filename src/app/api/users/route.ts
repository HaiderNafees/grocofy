import { NextResponse } from 'next/server';

function getUpstreamBaseUrl(): string | null {
  const envUrl = process.env.HOSTINGER_API_BASE_URL || process.env.NEXT_PUBLIC_HOSTINGER_API_BASE_URL;
  if (!envUrl) return null;
  return envUrl.replace(/\/$/, '');
}

async function proxy(request: Request) {
  const baseUrl = getUpstreamBaseUrl();
  if (!baseUrl) {
    return NextResponse.json(
      { error: 'HOSTINGER_API_BASE_URL is not configured' },
      { status: 500 }
    );
  }

  const upstreamUrl = new URL(`${baseUrl}/users.php`);
  const incomingUrl = new URL(request.url);
  incomingUrl.searchParams.forEach((value, key) => upstreamUrl.searchParams.set(key, value));

  const contentType = request.headers.get('content-type') || 'application/json';
  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';

  const upstreamResp = await fetch(upstreamUrl.toString(), {
    method: request.method,
    headers: {
      'Content-Type': contentType,
      // If you later add admin functions, you can forward X-User-Role here.
    },
    body: hasBody ? await request.text() : undefined,
    cache: 'no-store',
  });

  const text = await upstreamResp.text();
  const respHeaders: Record<string, string> = {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  };

  // Try to return JSON when possible
  try {
    const json = JSON.parse(text);
    return NextResponse.json(json, { status: upstreamResp.status, headers: respHeaders });
  } catch {
    return new NextResponse(text, { status: upstreamResp.status, headers: respHeaders });
  }
}

export async function GET(request: Request) {
  return proxy(request);
}

export async function POST(request: Request) {
  return proxy(request);
}

export async function PUT(request: Request) {
  return proxy(request);
}

export async function DELETE(request: Request) {
  return proxy(request);
}
