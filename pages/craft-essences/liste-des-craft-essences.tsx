import {
    Grid,
    Col,
    Card,
    Text,
    Metric,
    Title,
    LineChart,
    Divider,
    BarChart,
    Subtitle,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Badge,
    Button
} from "@tremor/react";
import {ProgressBar, MarkerBar, DeltaBar, RangeBar, CategoryBar} from "@tremor/react";
import {fetchCraftEssencesData} from "@/lib/api";
import {PrismaClient} from "@prisma/client";
import {getUserData} from "@/lib/user";
import Swal from "sweetalert2";
import {useState} from "react";
import Alert from "@/components/Alert";
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
    //Déclaration des variables
    const addCraftEssence = async (craft_essence, user_info = user) => {
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
                setListeCraftEssence(prevListeCraftEssence => {
                    const newListeCraftEssence = [...prevListeCraftEssence];
                    let servantToUpdate = newListeCraftEssence.find(current_ce => current_ce.id === craft_essence.id);
                    servantToUpdate.existe = true;
                    return newListeCraftEssence;
                });
                defineAlert("validation","La CE as bien été ajoutée");
            }else{
                defineAlert("erreur","Une erreur est survenue lors de l'ajout' de cette CE.");
            }
        }).catch(err => {
            defineAlert("erreur","Une erreur est survenue lors de l'ajout' de cette CE.");
        })
    }

    const deleteCraftEssence = async (craft_essence, user_info = user) => {
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
                setListeCraftEssence(prevListeCraftEssence => {
                    const newListeCraftEssence = [...prevListeCraftEssence];
                    let servantToUpdate = newListeCraftEssence.find(current_ce => current_ce.id === craft_essence.id);
                    servantToUpdate.existe = false;
                    return newListeCraftEssence;
                });
                defineAlert("validation","Cette CE à été supprimé de votre seconde archive !");
            }else{
                defineAlert("erreur","Une erreur est survenue lors de la suppresion de cette CE.");
            }
        }).catch(err => {
            defineAlert("erreur","Une erreur est survenue lors de la suppresion de cette CE.");
        })
    }

    /**
     * Fonction qui vas permettre de définir un message d'alerte et de le supprimer après
     * @param etat
     * @param message
     */
    function defineAlert(etat: string, message: string): void {
        setEtatAlert(etat);
        setMessageAlert(message);

        setTimeout(() => {
            setEtatAlert("");
            setMessageAlert("");
        }, 1500);
    }

    const switchPage = (event: any, page: number) => {
        event.preventDefault();
        setCurrentPage(page);
    };

    const [listeCraftEssence, setListeCraftEssence] = useState(liste_craft_essences);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [etatAlert, setEtatAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');

    //Déclaration des variables
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = listeCraftEssence.slice(indexOfFirstRow, indexOfLastRow);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(liste_craft_essences.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <>
            <Alert etat={etatAlert} message={messageAlert}/>
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
                        {currentRows.map((item) => {
                            const ce_id = item.id;

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

                            if(item.existe){
                                return (
                                    <TableRow key={item.name} className={"bg-green-200 rounded"}>
                                        <TableCell>
                                            <img alt={"ce_face"} className={"w-16 rounded-lg shadow-md"} src={item.extraAssets.faces.equip[ce_id]} loading={"lazy"}/>
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
                                            <Button size={"xs"} color={"red"} onClick={() => deleteCraftEssence(item)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }else{
                                return (
                                    <TableRow key={item.name}>
                                        <TableCell>
                                            <img alt={"ce_face"} className={"w-16 rounded-lg shadow-md"} src={item.extraAssets.faces.equip[ce_id]} loading={"lazy"}/>
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
                                            <Button size={"xs"} color={"green"} onClick={() => addCraftEssence(item) }>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
                <div className={"flex space-x-6 justify-center pt-6"}>
                    <Button size={"xs"} className={"border-gray-300 py-2 px-4 text-black bg-white rounded hover:bg-blue-600 hover:text-white duration-200 shadow"} onClick={(e) => switchPage(e, currentPage - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </Button>
                    <Button  className={"border-gray-300 py-2 px-4 text-black bg-white rounded hover:bg-blue-600 hover:text-white duration-200 shadow"}>
                        {currentPage}
                    </Button>
                    <Button size={"xs"} className={"border-gray-300 py-2 px-4 text-black bg-white rounded hover:bg-blue-600 hover:text-white duration-200 shadow"} onClick={(e) => switchPage(e, currentPage + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </Button>
                </div>
            </Card>
        </>
    );
}