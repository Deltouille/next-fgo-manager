import {fetchMaterialData, fetchServantData} from "@/lib/api";
import {Grid, Col, Card, Text, Metric, Divider, Title, Flex} from "@tremor/react";
import {ca} from "date-fns/locale";

//TODO : A Faire plus tard
export const getServerSideProps = async () => {
    const materials = await fetchMaterialData();
    function groupMaterialsByCateg(materials: object){
        const groupCateg = materials.reduce((acc, current_mat) => {
            const category = acc.find((current_categ) => current_categ.categorie === current_mat.type);
            if(category){
                category.items.push(current_mat);
            }else{
                acc.push({
                    categorie: current_mat.type,
                    items: [
                        {item: {
                                name: current_mat.name,
                                icon: current_mat.icon
                            }
                        }
                    ]
                });
            }
            return acc;
        }, []);

        return groupCateg;
    }

    const grouped_materials = groupMaterialsByCateg(materials);

    return {
        props: {
            grouped_materials
        }
    }
}

export default function Materiaux({grouped_materials}){
    return(
        <>
            {grouped_materials.map((current_categ) => {
                if(current_categ.categorie !== 'eventItem' && current_categ.categorie !== 'itemSelect' && current_categ.categorie !== 'svtCoin' && current_categ.categorie !== 'eventPoint' && current_categ.categorie !== 'svtCoin')
                    console.log(current_categ.items)
                    return (
                    <>
                        <Title className={"mb-2"}>{current_categ.categorie}</Title>
                        <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-5">
                            {current_categ.items.map((current_item) => {
                                return (
                                    <Col>
                                        <Card>
                                            <Title>{current_item.name}</Title>
                                            <Flex>
                                                <img className={"w-1/4"} loading={"lazy"} src={current_item.icon}/>
                                                <Text>Title</Text>
                                            </Flex>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Grid>
                        <Divider/>
                    </>
                )
            })}
            <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                <Col>
                    <Card>
                        <Text>Title</Text>
                        <Metric>KPI 1</Metric>
                    </Card>
                </Col>
            </Grid>
        </>
    );
}