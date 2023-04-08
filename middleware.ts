import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
    if(!request.cookies.has('token')){
        return NextResponse.redirect(new URL('/login', request.url))
    }else{
        
    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
}
