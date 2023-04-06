import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
    console.log('coucou');
    if(!request.cookies.has('token')){
        console.log('coucou - 1er if');
        return NextResponse.redirect(new URL('/login', request.url))
    }else{
        console.log('coucou - ELSE');
        try{
            console.log('AAAAAAAAAAAAAAAAAAA');
            const secret = process.env.JWT_SECRET_KEY;
            const token = request.cookies.get('token');
            const { payload, protectedHeader } = await jose.jwtDecrypt(token, secret)
            console.log('BBBBBBBBBBBBBBBBBBB');
            fetch('/api/checkUserValidity', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            }).then((res) => {
                if(res.status === 200){

                }else{
                    request.cookies.delete('token');
                    return NextResponse.redirect(new URL('/login', request.url))
                }
            })
        }catch (err){
            console.log(err);
            request.cookies.delete('token');
            return NextResponse.redirect(new URL('/login', request.url))
        }


    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
}
