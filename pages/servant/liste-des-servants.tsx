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
    Metric,
    Divider
} from "@tremor/react";
import {fetchServantData} from "@/lib/api";
import {getUserData} from "@/lib/user";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import Alert from "@/components/Alert";
import ServantCard from "@/components/Servant/ServantCard";
import Stars from "@/components/Stars";

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
    const [rowsPerPage] = useState(9);
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
        <div className="mx-auto p-4 w-5/6">
            <Alert etat={etatAlert} message={messageAlert}/>
            <Metric>Liste des Servants</Metric>
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
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Trier par rareté</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Trier par classe</option>
                    <option>Saber</option>
                    <option>Archer</option>
                    <option>Lancer</option>
                    <option>Rider</option>
                    <option>Caster</option>
                    <option>Assassin</option>
                    <option>Berserker</option>
                    <option>Ruler</option>
                    <option>Avenger</option>
                    <option>Moon Cancer</option>
                    <option>Alter Ego</option>
                    <option>Foreigner</option>
                    <option>Pretender</option>
                    <option>Shielder</option>
                    <option>Beast</option>
                </select>

                <div className="btn-group justify-self-end">
                    <button className="btn bg-green-500 hover:bg-green-600 border-green-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <button className="btn bg-red-500 hover:bg-red-600 border-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table table-zebra w-full">
                    <thead >
                        <tr >
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <th>Servant</th>
                            <th>Classe</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((item) => {
                            if(item.existe){
                            
                            }else{
                                return (
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.extraAssets.faces.ascension[Object.keys(item.extraAssets.faces.ascension)[Object.keys(item.extraAssets.faces.ascension).length - 1]]} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.name}</div>
                                                    <Stars nb_stars={item.rarity}/>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <img src="https://static.wikia.nocookie.net/fategrandorder/images/2/20/Class-Saber-Gold.webp" className="w-12 h-12" alt="" />
                                        </td>
                                        <th>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </th>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <div className="w-full flex">
            <div className="btn-group mx-auto">
                <button className="btn bg-blue-600 hover:bg-blue-500 border-blue-600">«</button>
                <button className="btn bg-blue-600 hover:bg-blue-500 border-blue-600">Page 1</button>
                <button className="btn bg-blue-600 hover:bg-blue-500 border-blue-600">»</button>
            </div>
            </div>
        </div>
    );
}