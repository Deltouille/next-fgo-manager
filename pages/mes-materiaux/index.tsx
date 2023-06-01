import {fetchMaterialData, fetchServantData} from "@/lib/api";
import {Grid, Col, Card, Text, Metric, Divider, Title, Flex} from "@tremor/react";
import {ca} from "date-fns/locale";

//TODO DEV : Faire la modification des valeurs et la base de données
//TODO OPTIMISATION : Modifier liste_materials afin d'inclure uniquement les données necessaires (id, nom, type, background, image
export const getServerSideProps = async () => {
    let materials = await fetchMaterialData();

    const exclude = ['svtCoin', 'ri', 'eventItem', 'itemSelect', 'dice', 'friendshipUpItem'];

    materials = materials.filter((current_mat) => {
        return !exclude.includes(current_mat.type);
    })

    return {
        props: {
            materials
        }
    }
}

export default function Materiaux({ materials }){
    return(
        <div className="mx-auto p-4 w-5/6">
            <Metric>Matériaux</Metric>
            <Divider/>
            <div className="flex flex-row pb-4 gap-5">
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"grid grid-cols-4 lg:grid-cols-8 gap-5 pb-5"}>
                {materials.map((current_item) => {
                    return(
                        <Card className={"flex flex-col items-center gap-4"}>
                            <img className={"w-16"} src={current_item.icon}/>
                            <Text>{current_item.name}</Text>
                            <Title>0</Title>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}