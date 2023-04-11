import {Grid, Col, Card, Text, Metric, Title, LineChart, Divider, BarChart, Subtitle, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge} from "@tremor/react";
import {ProgressBar, MarkerBar, DeltaBar, RangeBar, CategoryBar} from "@tremor/react";
import {getUserData} from "@/lib/user";
import {PrismaClient} from "@prisma/client";

export const getServerSideProps = async (context) => {
    const { req } = context;
    const user = await getUserData(req);

    const prisma = new PrismaClient();

    const liste_craft_essences = await prisma.craftEssenceInfo.findMany({
        where: {
            userId: user.id
        },
        include: {
            craft_essence: true,
        }
    });

    return {
        props : {
            liste_craft_essences
        }
    }
}

export default function MesCraftEssences({ liste_craft_essences }) {
    return(
        <>
            <Card>
                <Title>Liste des servants</Title>
                <Table className="mt-5">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell></TableHeaderCell>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Rareté</TableHeaderCell>
                            <TableHeaderCell>Type</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {liste_craft_essences.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell><img src={item.craft_essence.craft_essence_face} className={"w-1/4 rounded-lg shadow-md"} loading={"lazy"}/></TableCell>
                                <TableCell>
                                    <Text>{item.craft_essence.craft_essence_name}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.craft_essence.craft_essence_rarity}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.craft_essence.craft_essence_type}</Text>
                                </TableCell>
                                <TableCell>
                                    <div className={"flex gap-2"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-105 cursor-pointer text-red-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-105 cursor-pointer text-orange-600">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}