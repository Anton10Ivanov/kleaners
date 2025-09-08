import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic health check
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'unknown', // Will be updated when Supabase is connected
        cache: 'ok'
      }
    }

    return NextResponse.json(health, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      }, 
      { status: 500 }
    )
  }
}
