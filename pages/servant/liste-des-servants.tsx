import {Grid, Col, Card, Text, Metric, Title, LineChart, Divider, BarChart, Subtitle, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge} from "@tremor/react";
import {ProgressBar, MarkerBar, DeltaBar, RangeBar, CategoryBar} from "@tremor/react";
import {fetchServantData} from "@/lib/api";
import {getUserData} from "@/lib/user";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import Swal from "sweetalert2";

export const getServerSideProps = async (context) => {
    const liste_servants = await fetchServantData();

    const { req } = context;
    const user = await getUserData(req);

    const prisma = new PrismaClient();
    const servants_of_users = await prisma.servantInfo.findMany({
        where: {
            userId: user.id
        },
        include: {servant: true}
    })

    liste_servants.forEach(obj1 => {
        let obj2 = servants_of_users.find(obj => obj.servant.servant_collectionNb === obj1.collectionNo)
        obj1.existe = (obj2 !== undefined);
    })

    return {
        props: {
            liste_servants,
            servants_of_users,
            user
        }
    }
}

export default function ListeDesServants({ liste_servants, servants_of_users, user}) {
    const handleSubmit = async (servant, user_info = user) => {
        let data = {
            servant, user_info
        }

        fetch('/api/servants/liste-servant/insert-servant-info', {
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

    const handleDelete = async (servant, user_info = user) => {
        let data = {
            servant, user_info
        }

        fetch('/api/servants/liste-servant/delete-servant-info', {
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
                    text: 'Ce servant à été supprimé de votre seconde archive ! ',
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
                            <TableHeaderCell>Classe</TableHeaderCell>
                            <TableHeaderCell>Rareté</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {liste_servants.map((item) => {
                            const hasServant = item.existe;

                            if(hasServant){
                                return (
                                    <TableRow key={item.name} className={"bg-green-200 rounded"}>
                                        <TableCell><img className={"w-1/4 rounded-lg shadow-md"} loading={"lazy"} src={item.extraAssets.faces.ascension[Object.keys(item.extraAssets.faces.ascension)[Object.keys(item.extraAssets.faces.ascension).length - 1]]}/></TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <Text>{item.className}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.rarity}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-105 cursor-pointer text-red-600" onClick={() => handleDelete(item) }>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </TableCell>
                                    </TableRow>
                                );
                            }else{
                                return (
                                    <TableRow key={item.name}>
                                        <TableCell><img className={"w-1/4 rounded-lg shadow-md"} loading={"lazy"} src={item.extraAssets.faces.ascension[Object.keys(item.extraAssets.faces.ascension)[Object.keys(item.extraAssets.faces.ascension).length - 1]]}/></TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <Text>{item.className}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.rarity}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-105 cursor-pointer text-green-600" onClick={() => handleSubmit(item) }>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </TableCell>
                                    </TableRow>
                                );
                            }

                        })}
                    </TableBody>
                </Table>
            </Card>
        </>
    );
}