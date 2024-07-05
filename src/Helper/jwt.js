import {jwtVerify,SignJWT} from 'jose'

// ? Generating JWT Token ------------------------------------------------/

async function GenAccessToken(data){
    var token = await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('20m')
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.SECRET_KEY));

    return token
}


// ? Verifing JWT Token --------------------------------------------------/

async function JWTVerify(token){
    try {
        var {payload} = await jwtVerify(token,new TextEncoder().encode(process.env.SECRET_KEY))
        return payload

    } catch (error) {
        return false
    }

}

// ? Exporting The Token -------------------------------------------------/


export {GenAccessToken , JWTVerify}