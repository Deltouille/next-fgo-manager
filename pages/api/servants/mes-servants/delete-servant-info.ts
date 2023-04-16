import { PrismaClient } from "@prisma/client";

//TODO : Faire la vérification de l'utilisateur

export default async function (req, res) {
    try {

        const prisma = new PrismaClient();

        const servant = req.body.servant;
        const user = req.body.user_info;

        const deleteServant = await prisma.servantInfo.delete({
            where: {
                id: servant.id
            }
        });

        res.status(200).json({ message: 'OK' });

    } catch (e) {

        res.status(500).json({message: 'Erreur'});

    }
}