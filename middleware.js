import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const path = request.nextUrl.pathname

    const isPublicPath = path == '/login' || path == '/register'
    const isAdminPath = path == '/data-entry/employee/create'

    const token = request.cookies.get('token')?.value || ''
    const admin = request.cookies.get('admin')?.value || ''

    if(isAdminPath && !admin) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if((isPublicPath && token) || (isPublicPath && admin)) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if(!isPublicPath && !token && !admin) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/department',
        '/data-entry/:path*'
    ],
}