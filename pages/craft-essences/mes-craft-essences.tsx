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
    Button, Metric, Flex, Grid, Col, SelectBoxItem, SelectBox
} from "@tremor/react";
import {getUserData} from "@/lib/user";
import {PrismaClient} from "@prisma/client";
import {useState} from "react";
import Modal from 'react-modal';

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
    const switchPage = (event: any, page: number) => {
        event.preventDefault();
        setCurrentPage(page);
    };

    /**
     * Fonction qui permet d'ouvrir la fenetre modale de modification d'un servant
     * @param servant_info
     */
    function modalOpen(craft_essence_info: object) {
        setIsModalOpen(true);
        setCraftEssenceInfo(craft_essence_info);
    }

    /**
     * Fonction qui sert a fermer la fenetre modale et a enlever les informations du servant selectionné de la variable useState "servantInfo".
     */
    function modalClose() {
        setIsModalOpen(false);
        setCraftEssenceInfo(null);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [craftEssenceInfo, setCraftEssenceInfo] = useState();
    const [newCeMlb, setNewCeMlb] = useState(false);
    const [newCeLvl, setNewCeLvl] = useState(1);
    const [listeCraftEssence, setListeCraftEssence] = useState(liste_craft_essences);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const [etatAlert, setEtatAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');

    //Déclaration des variables
    const customStyle = {overlay: {zIndex: '4',},}
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = listeCraftEssence.slice(indexOfFirstRow, indexOfLastRow);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(listeCraftEssence.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <>
            <Modal isOpen={isModalOpen} onAfterOpen={""} onRequestClose={""} style={customStyle} contentLabel="Example Modal" className={""}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:scale-110 duration-500 cursor-pointer" onClick={() => modalClose()}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <Metric className={"text-center"}>{craftEssenceInfo?.craft_essence?.craft_essence_name}</Metric>
                <Title className={"text-center uppercase"}>{craftEssenceInfo?.craft_essence?.craft_essence_type}</Title>
                <Title className={"text-center uppercase"}>{craftEssenceInfo?.craft_essence?.craft_essence_rarity}</Title>
                <Flex className={""}>
                    <div className={"h-40 sm:h-full"}>
                        <img className={"rounded-lg shadow-md object-cover w-2/3 mx-auto"} alt={"servant_face"} loading={"lazy"} src={"https://static.atlasacademy.io/NA/CharaGraph/100100/100100b@2.png"}/>
                    </div>
                    <div className={"mx-auto"}>
                        <Grid numCols={1} numColsSm={3} className={"gap-6 mb-6"}>
                            <Col numColSpan={2}>
                                <Text>Niveau de la craft essence : </Text>
                                <SelectBox onValueChange={(value) => setNewCeLvl(value)} defaultValue={`${craftEssenceInfo?.craft_essence_lvl}`}>
                                    <SelectBoxItem value="1" text="1"/>
                                    <SelectBoxItem value="2" text="2"/>
                                    <SelectBoxItem value="3" text="3"/>
                                    <SelectBoxItem value="4" text="4"/>
                                    <SelectBoxItem value="5" text="5"/>
                                    <SelectBoxItem value="6" text="6"/>
                                    <SelectBoxItem value="7" text="7"/>
                                    <SelectBoxItem value="8" text="8"/>
                                    <SelectBoxItem value="9" text="9"/>
                                    <SelectBoxItem value="10" text="10"/>
                                    <SelectBoxItem value="11" text="11"/>
                                    <SelectBoxItem value="12" text="12"/>
                                    <SelectBoxItem value="13" text="13"/>
                                    <SelectBoxItem value="14" text="14"/>
                                    <SelectBoxItem value="15" text="15"/>
                                    <SelectBoxItem value="16" text="16"/>
                                    <SelectBoxItem value="17" text="17"/>
                                    <SelectBoxItem value="18" text="18"/>
                                    <SelectBoxItem value="19" text="19"/>
                                    <SelectBoxItem value="20" text="20"/>
                                    <SelectBoxItem value="21" text="21"/>
                                    <SelectBoxItem value="22" text="22"/>
                                    <SelectBoxItem value="23" text="23"/>
                                    <SelectBoxItem value="24" text="24"/>
                                    <SelectBoxItem value="25" text="25"/>
                                    <SelectBoxItem value="26" text="26"/>
                                    <SelectBoxItem value="27" text="27"/>
                                    <SelectBoxItem value="28" text="28"/>
                                    <SelectBoxItem value="29" text="29"/>
                                    <SelectBoxItem value="30" text="30"/>
                                    <SelectBoxItem value="31" text="31"/>
                                    <SelectBoxItem value="32" text="32"/>
                                    <SelectBoxItem value="33" text="33"/>
                                    <SelectBoxItem value="34" text="34"/>
                                    <SelectBoxItem value="35" text="35"/>
                                    <SelectBoxItem value="36" text="36"/>
                                    <SelectBoxItem value="37" text="37"/>
                                    <SelectBoxItem value="38" text="38"/>
                                    <SelectBoxItem value="39" text="39"/>
                                    <SelectBoxItem value="40" text="40"/>
                                    <SelectBoxItem value="41" text="41"/>
                                    <SelectBoxItem value="42" text="42"/>
                                    <SelectBoxItem value="43" text="43"/>
                                    <SelectBoxItem value="44" text="44"/>
                                    <SelectBoxItem value="45" text="45"/>
                                    <SelectBoxItem value="46" text="46"/>
                                    <SelectBoxItem value="47" text="47"/>
                                    <SelectBoxItem value="48" text="48"/>
                                    <SelectBoxItem value="49" text="49"/>
                                    <SelectBoxItem value="50" text="50"/>
                                    <SelectBoxItem value="51" text="51"/>
                                    <SelectBoxItem value="52" text="52"/>
                                    <SelectBoxItem value="53" text="53"/>
                                    <SelectBoxItem value="54" text="54"/>
                                    <SelectBoxItem value="55" text="55"/>
                                    <SelectBoxItem value="56" text="56"/>
                                    <SelectBoxItem value="57" text="57"/>
                                    <SelectBoxItem value="58" text="58"/>
                                    <SelectBoxItem value="59" text="59"/>
                                    <SelectBoxItem value="60" text="60"/>
                                    <SelectBoxItem value="61" text="61"/>
                                    <SelectBoxItem value="62" text="62"/>
                                    <SelectBoxItem value="63" text="63"/>
                                    <SelectBoxItem value="64" text="64"/>
                                    <SelectBoxItem value="65" text="65"/>
                                    <SelectBoxItem value="66" text="66"/>
                                    <SelectBoxItem value="67" text="67"/>
                                    <SelectBoxItem value="68" text="68"/>
                                    <SelectBoxItem value="69" text="69"/>
                                    <SelectBoxItem value="70" text="70"/>
                                    <SelectBoxItem value="71" text="71"/>
                                    <SelectBoxItem value="72" text="72"/>
                                    <SelectBoxItem value="73" text="73"/>
                                    <SelectBoxItem value="74" text="74"/>
                                    <SelectBoxItem value="75" text="75"/>
                                    <SelectBoxItem value="76" text="76"/>
                                    <SelectBoxItem value="77" text="77"/>
                                    <SelectBoxItem value="78" text="78"/>
                                    <SelectBoxItem value="79" text="79"/>
                                    <SelectBoxItem value="80" text="80"/>
                                    <SelectBoxItem value="81" text="81"/>
                                    <SelectBoxItem value="82" text="82"/>
                                    <SelectBoxItem value="83" text="83"/>
                                    <SelectBoxItem value="84" text="84"/>
                                    <SelectBoxItem value="85" text="85"/>
                                    <SelectBoxItem value="86" text="86"/>
                                    <SelectBoxItem value="87" text="87"/>
                                    <SelectBoxItem value="88" text="88"/>
                                    <SelectBoxItem value="89" text="89"/>
                                    <SelectBoxItem value="90" text="90"/>
                                    <SelectBoxItem value="91" text="91"/>
                                    <SelectBoxItem value="92" text="92"/>
                                    <SelectBoxItem value="93" text="93"/>
                                    <SelectBoxItem value="94" text="94"/>
                                    <SelectBoxItem value="95" text="95"/>
                                    <SelectBoxItem value="96" text="96"/>
                                    <SelectBoxItem value="97" text="97"/>
                                    <SelectBoxItem value="98" text="98"/>
                                    <SelectBoxItem value="99" text="99"/>
                                    <SelectBoxItem value="100" text="100"/>
                                    <SelectBoxItem value="101" text="101"/>
                                    <SelectBoxItem value="102" text="102"/>
                                    <SelectBoxItem value="103" text="103"/>
                                    <SelectBoxItem value="104" text="104"/>
                                    <SelectBoxItem value="105" text="105"/>
                                    <SelectBoxItem value="106" text="106"/>
                                    <SelectBoxItem value="107" text="107"/>
                                    <SelectBoxItem value="108" text="108"/>
                                    <SelectBoxItem value="109" text="109"/>
                                    <SelectBoxItem value="110" text="110"/>
                                    <SelectBoxItem value="111" text="111"/>
                                    <SelectBoxItem value="112" text="112"/>
                                    <SelectBoxItem value="113" text="113"/>
                                    <SelectBoxItem value="114" text="114"/>
                                    <SelectBoxItem value="115" text="115"/>
                                    <SelectBoxItem value="116" text="116"/>
                                    <SelectBoxItem value="117" text="117"/>
                                    <SelectBoxItem value="118" text="118"/>
                                    <SelectBoxItem value="119" text="119"/>
                                    <SelectBoxItem value="120" text="120"/>
                                </SelectBox>
                            </Col>
                        </Grid>
                    </div>
                </Flex>
            </Modal>
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
                        {currentRows.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell>
                                    <img alt={"ce_face"} src={item.craft_essence.craft_essence_face} className={"w-16 rounded-lg shadow-md"} loading={"lazy"}/>
                                </TableCell>
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
                                        <Button size={"xs"} color={"red"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                            </svg>
                                        </Button>
                                        <Button size={"xs"} color={"blue"} onClick={() => modalOpen(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
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