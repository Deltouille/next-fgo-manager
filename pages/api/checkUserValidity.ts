import {PrismaClient} from "@prisma/client";
export default async function (req, res) {
    const prisma = new PrismaClient();

    const searchUser = await prisma.user.findUnique({
        where: {
            email: req.body.payload.email
        }
    });

    if(searchUser !== null){
        res.status(200).json({message: "Utilisateur valide"});
    }else{
        res.status(500).json({message: "Errer lors de l'authentification"});
    }
}