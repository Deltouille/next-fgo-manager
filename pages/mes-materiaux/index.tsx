import {fetchMaterialData, fetchServantData} from "@/lib/api";
import {Grid, Col, Card, Text, Metric, Divider, Title, Flex} from "@tremor/react";
import {ca} from "date-fns/locale";

//TODO DEV : Faire la modification des valeurs et la base de données
//TODO OPTIMISATION : Modifier liste_materials afin d'inclure uniquement les données necessaires (id, nom, type, background, image
export const getServerSideProps = async () => {
    const materials = await fetchMaterialData();

    const skillLvlUp = materials.filter((current_categ: object) => current_categ.type === "skillLvUp");
    const qp = materials.filter((current_categ: object) => current_categ.type === "qp");
    const saintQuartz = materials.filter((current_categ: object) => current_categ.type === "stone");
    const manaPrism = materials.filter((current_categ: object) => current_categ.type === "mana");
    const apRecover = materials.filter((current_categ: object) => current_categ.type === "apRecover").filter((current_categ: object) => current_categ.name === "Bronze Fruit");

    const liste_materials = {
        skillLvlUp: skillLvlUp,
        qp: qp,
        saintQuartz: saintQuartz,
        manaPrism: manaPrism,
        apRecover: apRecover,
    }

    return {
        props: {
            liste_materials
        }
    }
}

export default function Materiaux({liste_materials}){
    return(
        <>
            <Metric>QP / QUARTZ / MP</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsMd={4} className={"gap-5 mb-5"}>
                {liste_materials.qp.map((current_item) => {
                    return(
                        <Card className={"flex flex-col items-center gap-4"}>
                            <img className={"w-16"} src={current_item.icon}/>
                            <Text>{current_item.name}</Text>
                            <Title>0</Title>
                        </Card>
                    );
                })}
            </Grid>

            <Metric>Matériaux</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsMd={4} className={"gap-5"}>
                {liste_materials.skillLvlUp.map((current_item) => {
                    return(
                        <Card className={"flex flex-col items-center gap-4 hover:scale-105 duration-500 hover:shadow-lg cursor-pointer"}>
                            <img className={"w-16"} src={current_item.icon} alt={current_item.name}/>
                            <Text>{current_item.name}</Text>
                            <Title>0</Title>
                        </Card>
                    );
                })}
            </Grid>
        </>
    );
}