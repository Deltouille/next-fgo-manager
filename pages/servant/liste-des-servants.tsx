import {Card, Text, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button} from "@tremor/react";
import {fetchServantData} from "@/lib/api";
import {getUserData} from "@/lib/user";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import Alert from "@/components/Alert";

export const getServerSideProps = async (context) => {
    const liste_servants = await fetchServantData();

    const { req } = context;
    const user = await getUserData(req);

    const prisma = new PrismaClient();
    let servants_of_user = await prisma.servantInfo.findMany({
        where: {
            userId: user.id
        },
        include: {servant: true}
    });

    servants_of_user = servants_of_user.map((servant) => {
        return {
            ...servant,
            date_obtention: servant.date_obtention.toLocaleDateString()
        };
    });

    liste_servants.forEach(obj1 => {
        let obj2 = servants_of_user.find(obj => obj.servant.servant_collectionNb === obj1.collectionNo)
        obj1.existe = (obj2 !== undefined);
    })

    console.log(liste_servants);

    return {
        props: {
            liste_servants,
            servants_of_user,
            user
        }
    }
}

export default function ListeDesServants({ liste_servants, servants_of_user, user}) {
    //Déclaration des fonctions
    /**
     * Fonction qui permet d'ajouter un servant pour l'utilisateur connecté
     *
     * @param servant
     * @param user_info
     */
    function addServant (servant: object, user_info: object = user) {
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
                setListeServant(prevListeServant => {
                    const newListeServant = [...prevListeServant];
                    let servantToUpdate = newListeServant.find(current_servant => current_servant.id === servant.id);
                    servantToUpdate.existe = true;
                    return newListeServant;
                });
                defineAlert("validation", "Le servant a bien été ajouté a votre collection");
            }else{
                defineAlert("erreur", "Erreur lors de l'ajout du servant");
            }
        }).catch(err => {
            defineAlert("erreur", "Erreur lors de l'ajout du servant");
        })
    }

    /**
     * Fonction qui permet de supprimer un servant dans la collection de l'utilisateur
     *
     * @param servant
     * @param user_info
     */
    function deleteServant(servant: object, user_info: object = user) {
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
                setListeServant(prevListeServant => {
                    const newListeServant = [...prevListeServant];
                    let servantToUpdate = newListeServant.find(current_servant => current_servant.id === servant.id);
                    servantToUpdate.existe = false;
                    return newListeServant;
                });
                defineAlert("validation", "Le servant a bien été supprimé de votre collection");
            }else{
                defineAlert("erreur", "Une erreur est survenue lors de la suppresion de votre servant");
            }
        }).catch(err => {
            defineAlert("erreur", "Une erreur est survenue lors de la suppresion de votre servant");
        });
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

    /**
     * Fonction qui permet de changer de page dans le tableau
     * 
     * @param event
     * @param page
     */
    const switchPage = (event: any, page: number) => {
        event.preventDefault();
        setCurrentPage(page);
    };

    const [listeServant, setListeServant] = useState(liste_servants);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [etatAlert, setEtatAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');

    //Déclaration des variables
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = listeServant.slice(indexOfFirstRow, indexOfLastRow);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(liste_servants.length / rowsPerPage); i++) {
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
                            <TableHeaderCell>Classe</TableHeaderCell>
                            <TableHeaderCell>Rareté</TableHeaderCell>
                            <TableHeaderCell>Action</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((item) => {
                            if(item.existe){
                                return (
                                    <TableRow key={item.name} className={"bg-green-200 rounded"}>
                                        <TableCell>
                                            <img className={"w-16 rounded-lg shadow-md"} alt={"servant_face"} loading={"lazy"} src={item.extraAssets.faces.ascension[Object.keys(item.extraAssets.faces.ascension)[Object.keys(item.extraAssets.faces.ascension).length - 1]]}/></TableCell>
                                        <TableCell>
                                            <Text>{item.name}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.className}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.rarity}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Button color={"red"} size={"xs"} onClick={() => deleteServant(item) }>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            }else{
                                return (
                                    <TableRow key={item.name}>
                                        <TableCell>
                                            <img className={"w-16 rounded-lg shadow-md"} alt={"servant_face"} loading={"lazy"} src={item.extraAssets.faces.ascension[Object.keys(item.extraAssets.faces.ascension)[Object.keys(item.extraAssets.faces.ascension).length - 1]]}/></TableCell>
                                        <TableCell>
                                            <Text>{item.name}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.className}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Text>{item.rarity}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Button color={"green"} size={"xs"} onClick={() => addServant(item) }>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
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