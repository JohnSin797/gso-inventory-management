import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
 
export function middleware(request) {
    const path = request.nextUrl.pathname

    const isPublicPath = path == '/login'
    const isAdminPath = path.startsWith('/data-entry')   

    const token = request.cookies.get('token')?.value || ''
    const decoded = jwt.decode(token, {complete: true})

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    
    if(isAdminPath && decoded.payload?.role != 'admin') {
        const response = NextResponse.redirect(new URL('/login', request.nextUrl))
        response.cookies.set('token', '', {httpOnly: true, expires: new Date(0)})
        return response
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/department',
        '/data-entry/:path*',
        '/scan'
    ],
}