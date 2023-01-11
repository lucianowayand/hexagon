import type { NextRequest } from 'next/server'
import { decode } from "../services/jwt";

export async function checkIfLoggedInAPI(req: NextRequest) {
    const token = req.headers.get("Authorization")
    if (!token) {
        return null
    }
    const decodedToken = await decode(token)
    return decodedToken
}

export async function checkIfLoggedInFRONT(req: NextRequest) {
    const cookie = req.cookies.get("jwt")
    if (!cookie) {
        return null
    }
    const decodedToken = await decode(cookie.value)
    return decodedToken
}