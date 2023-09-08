import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
 
export function middleware(request) {
    const path = request.nextUrl.pathname

    const isPublicPath = path == '/login'

    const token = request.cookies.get('token')?.value || ''

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/department',
        '/employee',
        '/data-entry/:path*',
        '/scan'
    ],
}