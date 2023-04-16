import {fetchStoryData} from "@/lib/api";
import {Card, Col, Divider, Grid, Metric, Text, Title, Button, Flex} from "@tremor/react";

export const getServerSideProps = async () => {

    const chapters = await fetchStoryData();

    let story_chapters: [] = [];

    story_chapters = chapters
        .filter((current_chapter) => {
            return current_chapter.flags.includes("mainScenario") && current_chapter.flags.includes("isWarIconLeft");
        })
        .map((current_chapter) => {
                return {
                    name: current_chapter.longName,
                    type: "Story",
                    id: current_chapter.id
                };
        });

    return {
        props: {
            story_chapters
        }
    }
}

export default function Histoire({story_chapters}){
    return(
        <>
            <Metric>Chapitres d'Histoire</Metric>
            <Divider/>
            <Grid numCols={1} numColsSm={2} className="gap-5">
                {story_chapters.map((current_chapter) => {
                    return (
                        <Col>
                            <Card>
                                <Text>{current_chapter.name}</Text>
                                <Flex className={"mt-5"}>
                                    <Button size={"xs"}>A faire</Button>
                                    <Button size={"xs"}>En cours</Button>
                                    <Button size={"xs"}>Terminé</Button>
                                    <Button size={"xs"}>Raté</Button>
                                </Flex>
                            </Card>
                        </Col>
                    )
                })}
            </Grid>
        </>
    )
}