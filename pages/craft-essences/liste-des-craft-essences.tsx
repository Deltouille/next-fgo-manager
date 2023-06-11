import {
    Metric,
    Divider,
} from "@tremor/react";
import {fetchCraftEssencesData} from "@/lib/api";
import {PrismaClient} from "@prisma/client";
import {getUserData} from "@/lib/user";
import Swal from "sweetalert2";
import {useState} from "react";
import Alert from "@/components/Alert";
import Stars from "@/components/Stars";

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

    function addCeBatch(user_info: object = user){
        checkedRows.map((current_row) => {
            addCraftEssence(current_row, user_info);
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
    const [rowsPerPage] = useState(10);
    const [etatAlert, setEtatAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [checked, setChecked] = useState(false);
    const [checkedRows, setCheckedRows] = useState([]);
    function handleCheckButton(){
        setChecked(!checked);
    }

    const handleCheckRow = (row) => {
        if (checked) {
            if (checkedRows.includes(row)) {
                setCheckedRows(checkedRows.filter((item) => item !== row));
            } else {
                setCheckedRows([...checkedRows, row]);
            }
        } else {
            // Gérer le changement de l'état des cases à cocher individuelles ici
        }
    };

    //Déclaration des variables
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = listeCraftEssence.slice(indexOfFirstRow, indexOfLastRow);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(liste_craft_essences.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className="mx-auto p-4 w-5/6">
            <Alert etat={etatAlert} message={messageAlert}/>
            <Metric>Liste des craft essences</Metric>
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
                    <option disabled selected>Trier par type</option>
                    <option>Saber</option>
                    <option>Archer</option>
                    <option>Lancer</option>
                </select>

                <div className="btn-group justify-self-end">
                    <button className="btn bg-green-500 hover:bg-green-600 border-green-700" onClick={() => addCeBatch()}>
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
                                <input type="checkbox" className="checkbox" checked={checked} onClick={() => handleCheckButton()}/>
                            </label>
                            </th>
                            <th>Craft Essence</th>
                            <th>Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
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
                            
                            }else{
                                return (
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" checked={checkedRows.includes(item)} onChange={() => handleCheckRow(item)}/>
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.extraAssets.faces.equip[ce_id]} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.name}</div>
                                                    <Stars nb_stars={item.rarity}/>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.flag}
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
            <div className="w-full flex pt-4">
                <div className="btn-group mx-auto">
                    <button className="btn bg-blue-600 hover:bg-blue-500 border-blue-600" onClick={(e) => switchPage(e, currentPage - 1)}>«</button>
                    <button className="btn bg-blue-600 hover:bg-blue-500 border-blue-600">Page {currentPage}</button>
                    <button className="btn bg-blue-600 hover:bg-blue-500 border-blue-600" onClick={(e) => switchPage(e, currentPage + 1)}>»</button>
                </div>
            </div>
        </div>
    );
}