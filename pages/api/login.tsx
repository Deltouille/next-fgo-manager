import {PrismaClient} from "@prisma/client";
import {serialize} from "cookie";
import * as jose from 'jose';

/**
 * Route "Login" de l'API : Connecte un utilisateur
 *
 * Vérifie la présence de l'utilisateur dans la base de données.
 * Vérifie que le mot de passe de l'utilisateur correspond à celui présent en base de données
 * Créer un cookie "JSON Web Token" qui vas servir a authentifier un utilisateur.
 *
 * @param req
 * @param res
 */
export default async function (req, res){
    const bcrypt = require('bcrypt')

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });

    if(user !== null) {
        const password = await bcrypt.compare(req.body.password, user.password).then(function(result: boolean){
            return result
        })

        if(password){
            const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
            const alg = 'HS256'
            const token = await new jose.SignJWT({ user })
                .setProtectedHeader({ alg })
                .setIssuedAt()
                .setIssuer('')
                .setAudience('')
                .setExpirationTime('24h')
                .sign(secret)

            const cookie = serialize('token', token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            res.setHeader('Set-Cookie', cookie);

            res.status(200).json({message: "Utilisateur authentifié"});
        }else{
            res.status(500).json({message: "L'email ou le mot de passe n'est pas le bon."})
        }
    }else{
        res.status(500).json({message: "Erreur lors de l'authentification."});
    }
}