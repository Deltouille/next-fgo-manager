import { PrismaClient } from "@prisma/client";
//TODO : Vérification de l'utilisateur
//TODO : Marche pas
export default async function (req, res) {
    try {

        const prisma = new PrismaClient();

        const servant = req.body.servant;
        const user = req.body.user_info;

        const getServant = await prisma.servant.findFirst({
            where: {
                servant_collectionNb: servant.collectionNo
            }
        });

        if(getServant !== null){
            console.log(req.body.dateObtention[0]);
            const updateServant = await prisma.servantInfo.update({
                data: {
                    servant_lvl: parseInt(req.body.newServantLvl),
                    skill_1_lvl: parseInt(req.body.newSkill1Lvl),
                    skill_2_lvl: parseInt(req.body.newSkill2Lvl),
                    skill_3_lvl: parseInt(req.body.newSkill3Lvl),
                    append_1_lvl: parseInt(req.body.newAppendSkill1Lvl),
                    append_2_lvl: parseInt(req.body.newAppendSkill2Lvl),
                    append_3_lvl: parseInt(req.body.newAppendSkill3Lvl),
                    fou_hp: parseInt(req.body.fouHp),
                    fou_atk: parseInt(req.body.fouAtk),
                    bond_lvl: parseInt(req.body.bondLvl),
                    np_lvl: parseInt(req.body.npLvl),
                    date_obtention: req.body.dateObtention[0]
                },
                where: {
                   id: servant.id
                }
            });

            res.status(200).json({message: 'OK'})

        }else{
            res.status(500).json({message: 'Problème lors de la modification du servant'});
        }

    }catch (err){
        res.status(500).json({message: err});
    }
}