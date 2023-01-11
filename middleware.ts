import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkIfLoggedInAPI, checkIfLoggedInFRONT } from "./middlewares/auth";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/auth')) {
        const loggedIn = await checkIfLoggedInAPI(request)
        if (!loggedIn) {
            const url = request.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.json({success: false, message: "Login needed"})
        }
    }
    if (request.nextUrl.pathname == "/dashboard"){
        const loggedIn = await checkIfLoggedInFRONT(request)
        if (!loggedIn) {
            const url = request.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.redirect(url)
        }
    }
    return NextResponse.next()
}