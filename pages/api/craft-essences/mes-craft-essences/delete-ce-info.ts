import { PrismaClient } from "@prisma/client";

//TODO : Faire la vérification de l'utilisateur

export default async function (req, res) {
    try{

        const prisma = new PrismaClient();

        const craft_essence = req.body.craft_essence;
        const user = req.body.user;

        const deleteCraftEssence = await prisma.craftEssenceInfo.delete({
            where: {
                id: craft_essence.id
            }
        });

        res.status(200).json({message: 'ce bien supprimée'})

    }catch (e) {
        res.status(500).json({message: 'error'});
    }
}