import * as jose from "jose";
import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt')

/**
 * Fonction qui vas permettre de vérifier si un utilisateur est connecté et valide.
 * On vas extraire les informations de l'utilisateur stockés dans le cookie "token" afin de vérifier si l'utilisateur
 * existe bien dans la base de données et que le mot de passe est bien valide
 * @param request
 */
export async function verifyUser(request){
    //On vérifie que l'utilisateur est bien connecté et que son token est valide
    try{
        const prisma = new PrismaClient();
        //On récupère les cookies
        const cookieHeader = request.headers.cookie;
        //On récupère le cookie qui s'appelle "token"
        const tokenCookie = cookieHeader?.split(';').find(cookie => cookie.trim().startsWith('token='));
        //On récupère la valeur du cookie "token"
        const token = tokenCookie.split('=')[1];
        //On
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const { payload } = await jose.jwtVerify(token, secret);

        const user = await prisma.user.findUnique({
            where: {
                email: payload.user.email
            }
        });

        if(user !== null){
            const password = await bcrypt.compare(payload.user.password, user.password).then(function(result: boolean){
                return result
            });

            return password;
        }else{
            return false;
        }


    }catch (err){
        return false
    }
}

/**
 * Fonction qui vas permettre de récupèrer les informations de l'utilisateur connecté
 */
export async function getUserData(request){

    const prisma = new PrismaClient();
    //On récupère les cookies
    const cookieHeader = request.headers.cookie;
    //On récupère le cookie qui s'appelle "token"
    const tokenCookie = cookieHeader?.split(';').find(cookie => cookie.trim().startsWith('token='));
    //On récupère la valeur du cookie "token"
    const token = tokenCookie.split('=')[1];
    //On
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jose.jwtVerify(token, secret);


    const user = await prisma.user.findUnique({
        where: {
            email: payload.user.email
        }
    });
    
    return user;

}