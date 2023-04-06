import {PrismaClient, Prisma } from "@prisma/client";

export default async function (req, res) {

    const bcrypt = require('bcrypt');

    const prisma = new PrismaClient();

    const searchUser = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });
    if(searchUser === null){

        const password = await bcrypt.hash(req.body.password, 10).then(function(hash: string){
            return hash;
        });

        const user = {
            email: req.body.email,
            password: password,
            role: 'ROLE_USER'
        }

        const createUser = await prisma.User.create({ data: user })

        res.status(200).json({message: "Votre compte a bien été créer ! "});
    }else{
        res.status(500).json({message: "Impossible de créer votre compte."});
    }
}