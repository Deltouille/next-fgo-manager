import { PrismaClient } from "@prisma/client";
// TODO : Vérification de l'utilisateur

export default async function (req, res) {
    try {

         const prisma = new PrismaClient();
         const craft_essence = req.body.craft_essence;
         const user = req.body.user_info;

         const getCraftEssence = await prisma.craftEssence.findFirst({
            where: {
                craft_essence_collectionNo: craft_essence.collectionNo
            }
        })

         if(getCraftEssence !== null){
            const setCraftEssenceToUser = await prisma.craftEssenceInfo.create({
                data: {
                    craftEssenceId: getCraftEssence.id,
                    userId: user.id
                }
            });

            res.status(200).json({message: 'OK'});

        }else{

            const insertCraftEssence = await prisma.craftEssence.create({
                data: {
                    craft_essence_name: craft_essence.name,
                    craft_essence_rarity: craft_essence.rarity,
                    craft_essence_collectionNo: craft_essence.collectionNo,
                    craft_essence_type: craft_essence.flag,
                    craft_essence_face: craft_essence.extraAssets.faces.equip[craft_essence.id]
                }
            });

            const getCraftEssence = await prisma.craftEssence.findFirst({
                where: {
                    craft_essence_collectionNo: craft_essence.collectionNo
                }
            });

            const setCraftEssenceToUser = await prisma.craftEssenceInfo.create({
                data: {
                    craftEssenceId: getCraftEssence.id,
                    userId: user.id
                }
            });

            res.status(200).json({ message: 'OK' })
        }

    }catch (e) {

        res.status(500).json({message: craft_essence});

    }
}