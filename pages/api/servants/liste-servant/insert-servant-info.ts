import { PrismaClient } from "@prisma/client";
// TODO : Vérification de l'utilisateur
/**
 * Route d'api pour attribuer un nouveau servant à un utilisateur.
 * Vérifie que la requête provient bien d'un utilisateur authentifié
 * Vérifie que le servant existe dans la table "Servant"
 * Si il existe, on ajoute le servant a l'utilisateur dans la table "ServantInfo"
 * Sinon, on enregistre le Servant dans la table "Servant" et ajoute ensuite dabs la table "ServantInfo"
 * @param req
 * @param res
 */
export default async function (req, res) {
    try {
        const prisma = new PrismaClient();

        const servant = req.body.servant;
        const user = req.body.user_info;

        const getServant = await prisma.servant.findFirst({
            where: {
                servant_collectionNb: servant.collectionNo
            }
        })

        if(getServant !== null){
            const setServantToUser = await prisma.servantInfo.create({
                data: {
                    servantId: getServant.id,
                    userId: user.id
                }
            })

            res.status(200).json({message: 'OK'})
        }else{
            const insertServant = await prisma.servant.create({
                data: {
                    servant_name: servant.name,
                    servant_class: servant.className,
                    servant_collectionNb: servant.collectionNo,
                    servant_rarity: servant.rarity,
                    servant_face: servant.extraAssets.faces.ascension[Object.keys(servant.extraAssets.faces.ascension)[Object.keys(servant.extraAssets.faces.ascension).length - 1]]
                }
            })

            const getServant = await prisma.servant.findFirst({
                where: {
                    servant_collectionNb: servant.collectionNo
                }
            })

            const setServantToUser = await prisma.servantInfo.create({
                data: {
                    servantId: getServant.id,
                    userId: user.id
                }
            })

            res.status(200).json({message: 'OK'})
        }

    }catch (err) {
        res.status(500).json({message: 'Problème lors de l\'ajout du servant'});
    }

}