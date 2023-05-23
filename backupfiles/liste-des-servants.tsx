import {
    Card,
    Text,
    Title,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Button,
    Metric
} from "@tremor/react";
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
            <Metric>Liste des Servants</Metric>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th className={"bg-[#C5C5C5]"}>Servant</th>
                        <th className={"bg-[#C5C5C5]"}>Classe</th>
                        <th className={"bg-[#C5C5C5]"}>Favorite Color</th>
                        <th className={"bg-[#C5C5C5]"}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRows.map((item) => {
                        if(item.existe){
                            return (
                                <tr key={item.name} className={"bg-green-200 rounded"}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.extraAssets.faces.ascension[Object.keys(item.extraAssets.faces.ascension)[Object.keys(item.extraAssets.faces.ascension).length - 1]]} alt="Avatar Tailwind CSS Component" loading={"lazy"}/>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Text>{item.className}</Text>
                                    </td>
                                    <td>
                                        <Text>{item.rarity}</Text>
                                    </td>
                                    <td>
                                        <Button color={"red"} size={"xs"} onClick={() => deleteServant(item) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        }else{
                            return (
                                <tr key={item.name}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.extraAssets.faces.ascension[Object.keys(item.extraAssets.faces.ascension)[Object.keys(item.extraAssets.faces.ascension).length - 1]]} alt="Avatar Tailwind CSS Component" loading={"lazy"}/>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Text>{item.className}</Text>
                                    </td>
                                    <td>
                                        <Text>{item.rarity}</Text>
                                    </td>
                                    <td>
                                        <Button color={"green"} size={"xs"} onClick={() => addServant(item) }>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        }

                    })}
                    </tbody>
                </table>
            </div>
            <div className="btn-group mx-auto justify-center flex">
                <button className="btn" onClick={(e) => switchPage(e, currentPage - 1)}>«</button>
                <button className="btn">Page {currentPage}</button>
                <button className="btn" onClick={(e) => switchPage(e, currentPage + 1)}>»</button>
            </div>
        </>
    );
}