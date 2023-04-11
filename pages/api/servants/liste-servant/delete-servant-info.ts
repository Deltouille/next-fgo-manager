import { PrismaClient } from "@prisma/client";

export default async function (req, res) {

    try {
        const prisma = new PrismaClient()
        const user = req.body.user_info;
        const servant = req.body.servant;

        const getServant = await prisma.servant.findFirst({
            where: {
                servant_collectionNb: servant.collectionNo
            }
        })

        const servantInfo = await prisma.servantInfo.findFirst({
            where: {
                userId: user.id,
                servantId: getServant.id
            }
        });

        const deleteServantInfo = await prisma.servantInfo.delete({
            where: {
                id: servantInfo.id
            }
        })

        res.status(200).json({message: 'OK'})

    }catch (err) {
        res.status(500).json({message: 'erreur'})
    }

}