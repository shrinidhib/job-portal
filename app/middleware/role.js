import { NextResponse } from 'next/server';

export function authorizeRole(...allowedRoles) {
  return async function(request) {
    const user = request.user;
    
    if (!user || !allowedRoles.includes(user.role)) {
      return new NextResponse(JSON.stringify({ error: 'Access denied' }), { status: 403 });
    }
    return null;
  };
}
