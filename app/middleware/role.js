import { NextResponse } from 'next/server';

export function authorizeRole(...allowedRoles) {
    return (request, response, next) => {
      if (!allowedRoles.includes(request.user.role)) {
        return new NextResponse(JSON.stringify({ error: 'Access denied' }), { status: 403 });
      }
      next(); 
    };
  }
  