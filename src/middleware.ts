import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// List of paths that require authentication
const protectedPaths = [
  '/api/protected',
  // Add more protected paths as needed
];

// List of paths that require admin role
const adminPaths = [
  '/api/admin',
  // Add more admin paths as needed
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(pp => path.startsWith(pp));
  const isAdminPath = adminPaths.some(ap => path.startsWith(ap));
  
  if (!isProtectedPath && !isAdminPath) {
    return NextResponse.next();
  }

  // Get the token from the Authorization header
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Verify the token
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  // Check admin role for admin paths
  if (isAdminPath && (decoded as any).role !== 'admin') {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/protected/:path*',
    '/api/admin/:path*',
    // Add more paths as needed
  ],
};