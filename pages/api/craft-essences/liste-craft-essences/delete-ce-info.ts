import { PrismaClient } from "@prisma/client";

export default async function (req, res){
    try {
        const prisma = new PrismaClient()
        const user = req.body.user_info;
        const craft_essence = req.body.craft_essence;

        const getCraftEssence = await prisma.craftEssence.findFirst({
            where: {
                craft_essence_collectionNo: craft_essence.collectionNo
            }
        })

        const craftEssenceInfo = await prisma.craftEssenceInfo.findFirst({
            where: {
                userId: user.id,
                craftEssenceId: getCraftEssence.id
            }
        })

        const deleteServant = await prisma.craftEssenceInfo.delete({
            where: {
                id: craftEssenceInfo.id
            }
        })
        res.status(200).json({message: 'OK'})
    }catch (e) {
        res.status(500).json({message: 'erreur'})
    }
}