import * as jwt from 'jose'

const secret =  new TextEncoder().encode(process.env.FIREBASE_API_KEY || "")
const alg = 'HS256'


export const sign = async (token: any) => {
    const jwtToken =  await new jwt.SignJWT(token)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('urn:hexagon:issuer')
    .setAudience('urn:hexagon:audience')
    .setExpirationTime('24h')
    .sign(secret)
    return jwtToken.toString()
}

export const decode = async (token: any) => {
    const { payload, protectedHeader } = await jwt.jwtVerify(token, secret, {
        issuer: 'urn:hexagon:issuer',
        audience: 'urn:hexagon:audience',
    })
    return payload.toString()
}