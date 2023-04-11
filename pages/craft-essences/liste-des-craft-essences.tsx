import {Grid, Col, Card, Text, Metric, Title, LineChart, Divider, BarChart, Subtitle, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge} from "@tremor/react";
import {ProgressBar, MarkerBar, DeltaBar, RangeBar, CategoryBar} from "@tremor/react";
import {fetchCraftEssencesData} from "@/lib/api";
import {PrismaClient} from "@prisma/client";
import {getUserData} from "@/lib/user";
import Swal from "sweetalert2";
export const getServerSideProps = async (context) => {
    const { req } = context;

    const user = await getUserData(req);

    const prisma = new PrismaClient();

    const liste_craft_essences = await fetchCraftEssencesData();
    const craft_essences_of_user = await prisma.craftEssenceInfo.findMany({
        where: {
            userId: user.id
        },
        include: { craft_essence: true }
    })

    liste_craft_essences.forEach(obj1 => {
        let obj2 = craft_essences_of_user.find(obj => obj.craft_essence.craft_essence_collectionNo === obj1.collectionNo)
        obj1.existe = (obj2 !== undefined);
    })

    return {
        props: {
            liste_craft_essences,
            user
        }
    }
}

export default function ListeDesCraftEssences({ liste_craft_essences, user }) {

    const handleSubmit = async (craft_essence, user_info = user) => {
        let data = {
            craft_essence, user_info
        }

        fetch('/api/craft-essences/liste-craft-essences/insert-ce-info', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Ce servant à été ajouté ! ',
                    confirmButtonColor: '#3b82f6',
                    confirmButtonText: 'Valider',
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'ERRRRRRRREURRR',
                    text: JSON.stringify(res.json()),
                    cancelButtonColor: '#dc2626',
                    cancelButtonText: 'Annuler',
                });
            }
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la connexion.',
                cancelButtonColor: '#dc2626',
                cancelButtonText: 'Annuler',
            });
        })
    }

    const handleDelete = async (craft_essence, user_info = user) => {
        let data = {
            craft_essence, user_info
        }

        fetch('/api/craft-essences/liste-craft-essences/delete-ce-info', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Cette CE à été supprimé de votre seconde archive ! ',
                    confirmButtonColor: '#3b82f6',
                    confirmButtonText: 'Valider',
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'ERRRRRRRREURRR',
                    text: 'Une erreur est survenue lors de la connexion.',
                    cancelButtonColor: '#dc2626',
                    cancelButtonText: 'Annuler',
                });
            }
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la connexion.',
                cancelButtonColor: '#dc2626',
                cancelButtonText: 'Annuler',
            });
        })
    }

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
                        {liste_craft_essences.map((item) => {
                            const ce_id = item.id;
                            const hasCE = item.existe;

                            switch(item.flag){
                                case 'svtEquipFriendShip':
                                    item.flag = "Bond CE";
                                    break;
                                case 'svtEquipChocolate':
                                    item.flag = "Valentine CE";
                                    break;
                                case 'normal':
                                    item.flag = "Normal CE";
                                    break;
                            }

                            if(hasCE){
                                return (
                                    <TableRow key={item.name} className={"bg-green-200 rounded"}>
                                        <TableCell>
                                            <img className={"w-1/4 rounded-lg shadow-md"} src={item.extraAssets.faces.equip[ce_id]} loading={"lazy"}/>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.name}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.rarity}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.flag}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.departement}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-105 cursor-pointer text-red-600" onClick={() => handleDelete(item)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </TableCell>
                                    </TableRow>
                                )
                            }else{
                                return (
                                    <TableRow key={item.name}>
                                        <TableCell>
                                            <img className={"w-1/4 rounded-lg shadow-md"} src={item.extraAssets.faces.equip[ce_id]} loading={"lazy"}/>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.name}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.rarity}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.flag}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.departement}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-105 cursor-pointer text-green-600" onClick={() => handleSubmit(item) }>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}