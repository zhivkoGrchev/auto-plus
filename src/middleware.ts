import { betterFetch } from '@better-fetch/fetch'
import { type NextRequest, NextResponse } from 'next/server'
import type { AuthSession } from './lib/types/auth'

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<AuthSession>('/api/auth/get-session', {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  })

  if (!session) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin'],
}
