import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )
  
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  const { pathname } = req.nextUrl
  
  // Protected routes that require authentication
  const protectedRoutes = [
    '/admin',
    '/client',
    '/provider',
    '/user',
    '/booking',
  ]
  
  // Auth routes that should redirect if already authenticated
  const authRoutes = [
    '/login',
    '/signup',
    '/reset-password',
  ]
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // Redirect authenticated users from auth routes
  if (isAuthRoute && session) {
    // Determine redirect path based on user role
    const redirectPath = await getRedirectPathForUser(session.user.id, supabase)
    return NextResponse.redirect(new URL(redirectPath, req.url))
  }
  
  return response
}

async function getRedirectPathForUser(userId: string, supabase: any): Promise<string> {
  try {
    // Check if user is an admin
    const { data: adminData } = await supabase
      .from('admin_roles')
      .select('role')
      .eq('user_id', userId)
      .single()
      
    if (adminData) {
      return '/admin/dashboard'
    }

    // Check if user is a provider
    const { data: providerData } = await supabase
      .from('service_providers')
      .select('id')
      .eq('id', userId)
      .maybeSingle()
      
    if (providerData) {
      return '/provider/dashboard'
    }

    // Check if user is a client
    const { data: clientData } = await supabase
      .from('clients')
      .select('id')
      .eq('id', userId)
      .maybeSingle()
      
    if (clientData) {
      return '/client/dashboard'
    }

    // Default fallback to client dashboard
    return '/client/dashboard'
  } catch (error) {
    console.error('Error determining user redirect path:', error)
    return '/client/dashboard'
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}