import {
    Badge,
    BarChart,
    Card,
    Col,
    Divider,
    DonutChart,
    AreaChart,
    Grid,
    LineChart,
    Metric,
    ProgressBar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    Title
} from "@tremor/react";
import {PrismaClient} from "@prisma/client";
import {getUserData} from "@/lib/user";

export const getServerSideProps = async (context) => {
    const { req } = context

    const prisma = new PrismaClient()
    const user = getUserData(req)

    const craft_essences_of_user = await prisma.craftEssenceInfo.findMany({
        where: {
            userId: user.id
        },
        include: {
            craft_essence: true
        }
    })

    let servants_of_user = await prisma.servantInfo.findMany({
        where: {
            userId: user.id
        },
        include: { servant: true }
    })

    servants_of_user = servants_of_user.map((servant) => {
        return {
            ...servant,
            date_obtention: servant.date_obtention.toLocaleDateString()
        };
    });

    const servants = await prisma.servant.findMany({})
    const craft_essences = await prisma.craftEssence.findMany({})

    return {
        props: {
            servants_of_user,
            servants,
            craft_essences_of_user,
            craft_essences
        }
    }
}

export default function Profil({ servants,  servants_of_user, craft_essences, craft_essences_of_user}){
    function countServantsByDate(servants: object) {
        const servantsByDate = {};
        servants.forEach((servant) => {
            const date = servant.date_obtention.split('T')[0];
            if (servantsByDate[date]) {
                servantsByDate[date]++;
            } else {
                servantsByDate[date] = 1;
            }
        });
        const servantsCountArray = Object.keys(servantsByDate)
            .sort((a, b) => {
                const dateA = new Date(a);
                const dateB = new Date(b);
                return dateA - dateB;
            }).map((date) => {
                return {
                    date_obtention: date,
                    "Nombre de servants obtenus": servantsByDate[date],
                };
            });
        return servantsCountArray;
    }

    function countServantByRarity(servants: object){
        let count_servant_5 = 0;
        let count_servant_4 = 0;
        let count_servant_3 = 0;
        let count_servant_2 = 0;
        let count_servant_1 = 0;

        servants.map((current_servant: object) => {
            switch (current_servant.servant.servant_rarity){
                case 5:
                    count_servant_5++;
                    break;
                case 4:
                    count_servant_4++;
                    break;
                case 3:
                    count_servant_3++;
                    break;
                case 2:
                    count_servant_2++;
                    break;
                case 1:
                    count_servant_1++;
                    break;
            }
        });

        return [
            { title: "Servants 5 ★", count: count_servant_5 },
            { title: "Servants 4 ★", count: count_servant_4 },
            { title: "Servants 3 ★", count: count_servant_3 },
            { title: "Servants 2 ★", count: count_servant_2 },
            { title: "Servants 1 ★", count: count_servant_1 },
        ]
    }

    function countServantsByLvl(servants: object) {
        let result = [];
        let uniqueLevels = new Set(servants.map(servant => servant.servant_lvl)); // Trouver les niveaux uniques dans le tableau

        uniqueLevels.forEach(level => { // Pour chaque niveau unique
            let count = servants.filter(servant => servant.servant_lvl === level).length; // Compter le nombre d'objets avec ce niveau
            result.push({ niveau: level, count: count }); // Ajouter un nouvel objet avec le niveau et le compte
        });

        return result;
    }

    function countMlbCraftEssences (craft_essences: object) {
        let count_true = 0;
        let count_false = 0;

        craft_essences.map((current_ce: object) => {
            const isObtained = current_ce.is_mlb;
            if(isObtained){
                count_true++;
            }else{
                count_false++;
            }
        });

        return [
            {title: "Nombre de CE MLB", count: count_true},
            {title: "Nombre de CE non MLB", count: count_false},
        ];
    }

    function countCraftEssencesByCategory (craft_essences: object) {
        let count_bond_ce = 0;
        let count_valentine_ce = 0;
        let count_normal_ce = 0;

        craft_essences.map((current_ce: object) => {
            switch (current_ce.craft_essence.craft_essence_type){
                case 'Valentine CE':
                    count_valentine_ce++;
                    break;
                case 'Bond CE':
                    count_bond_ce++;
                    break;
                case 'Normal CE':
                    count_normal_ce++;
                    break;
            }
        });

        return [
            {
                name: "Bond CE",
                "Nombre de CE": count_bond_ce
            },
            {
                name: "Valentine CE",
                "Nombre de CE": count_valentine_ce
            },
            {
                name: "Normal CE",
                "Nombre de CE": count_normal_ce
            }
        ]
    }

    function countCraftEssencesByLvl(craft_essences: object) {
        let result = [];
        let uniqueLevels = new Set(craft_essences.map(craft_essence => craft_essence.craft_essence_lvl)); // Trouver les niveaux uniques dans le tableau

        uniqueLevels.forEach(level => { // Pour chaque niveau unique
            let count = craft_essences.filter(craft_essence => craft_essence.craft_essence_lvl === level).length; // Compter le nombre d'objets avec ce niveau
            result.push({ niveau: level, count: count }); // Ajouter un nouvel objet avec le niveau et le compte
        });

        return result;
    }

    const nb_servants = servants.length;
    const nb_servants_of_user = servants_of_user.length;
    const percent_servants = (nb_servants_of_user / nb_servants) * 100;

    const nb_servant_5 = servants.filter( servant => servant.servant_rarity === 5 ).length;
    const nb_servant_4 = servants.filter( servant => servant.servant_rarity === 4 ).length;
    const nb_servant_3 = servants.filter( servant => servant.servant_rarity === 3 ).length;
    const nb_servant_2 = servants.filter( servant => servant.servant_rarity === 2 ).length;
    const nb_servant_1 = servants.filter( servant => servant.servant_rarity === 1 ).length;

    const nb_servant_5_of_user = servants_of_user.filter( servant => servant.servant.servant_rarity === 5 ).length;
    const nb_servant_4_of_user = servants_of_user.filter( servant => servant.servant.servant_rarity === 4 ).length;
    const nb_servant_3_of_user = servants_of_user.filter( servant => servant.servant.servant_rarity === 3 ).length;
    const nb_servant_2_of_user = servants_of_user.filter( servant => servant.servant.servant_rarity === 2 ).length;
    const nb_servant_1_of_user = servants_of_user.filter( servant => servant.servant.servant_rarity === 1 ).length;

    const nb_craft_essences = craft_essences.length;
    const nb_craft_essences_of_user = craft_essences_of_user.length;

    const nb_craft_essences_5 = craft_essences.filter( craft_essence => craft_essence.craft_essence_rarity === 5 ).length;
    const nb_craft_essences_4 = craft_essences.filter( craft_essence => craft_essence.craft_essence_rarity === 4 ).length;
    const nb_craft_essences_3 = craft_essences.filter( craft_essence => craft_essence.craft_essence_rarity === 3 ).length;
    const nb_craft_essences_2 = craft_essences.filter( craft_essence => craft_essence.craft_essence_rarity === 2 ).length;
    const nb_craft_essences_1 = craft_essences.filter( craft_essence => craft_essence.craft_essence_rarity === 1 ).length;

    const nb_craft_essences_5_of_user = craft_essences_of_user.filter( craft_essence => craft_essence.craft_essence.craft_essence_rarity === 5 ).length;
    const nb_craft_essences_4_of_user = craft_essences_of_user.filter( craft_essence => craft_essence.craft_essence.craft_essence_rarity === 4 ).length;
    const nb_craft_essences_3_of_user = craft_essences_of_user.filter( craft_essence => craft_essence.craft_essence.craft_essence_rarity === 3 ).length;
    const nb_craft_essences_2_of_user = craft_essences_of_user.filter( craft_essence => craft_essence.craft_essence.craft_essence_rarity === 2 ).length;
    const nb_craft_essences_1_of_user = craft_essences_of_user.filter( craft_essence => craft_essence.craft_essence.craft_essence_rarity === 1 ).length;

    const servant_line_chart = countServantsByDate(servants_of_user);
    const nb_servant_by_rarity = countServantByRarity(servants_of_user);
    const nb_servant_by_lvl = countServantsByLvl(servants_of_user);

    const nb_ce_mlb_or_not = countMlbCraftEssences(craft_essences_of_user);
    const nb_ce_by_category = countCraftEssencesByCategory(craft_essences_of_user);
    const nb_ce_by_lvl = countCraftEssencesByLvl(craft_essences_of_user);



    const barChartCE = [
        {
            name: "Amphibians",
            "Number of threatened species": 2488,
        },
        {
            name: "Birds",
            "Number of threatened species": 1445,
        },
        {
            name: "Crustaceans",
            "Number of threatened species": 743,
        },
        {
            name: "Amphibians",
            "Number of threatened species": 2488,
        },
        {
            name: "Birds",
            "Number of threatened species": 1445,
        },
        {
            name: "Crustaceans",
            "Number of threatened species": 743,
        },
    ];

    const tableData = [
        {
            name: "Viola Amherd",
            Role: "Federal Councillor",
            departement:
                "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
            status: "active",
        },
        {
            name: "Simonetta Sommaruga",
            Role: "Federal Councillor",
            departement:
                "The Federal Department of the Environment, Transport, Energy and Communications (DETEC)",
            status: "active",
        },
        {
            name: "Alain Berset",
            Role: "Federal Councillor",
            departement: "The Federal Department of Home Affairs (FDHA)",
            status: "active",
        },
        {
            name: "Ignazio Cassis",
            Role: "Federal Councillor",
            departement: "The Federal Department of Foreign Affairs (FDFA)",
            status: "active",
        },
        {
            name: "Ueli Maurer",
            Role: "Federal Councillor",
            departement: "The Federal Department of Finance (FDF)",
            status: "active",
        },
        {
            name: "Guy Parmelin",
            Role: "Federal Councillor",
            departement:
                "The Federal Department of Economic Affairs, Education and Research (EAER)",
            status: "active",
        },
        {
            name: "Karin Keller-Sutter",
            Role: "Federal Councillor",
            departement: "The Federal Department of Justice and Police (FDJP)",
            status: "active",
        },
    ];

    return(
        <div className="mx-auto w-5/6 pt-4">
            <Metric>Servants</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-5">
                <Col numColSpan={1} numColSpanLg={4}>
                    <Card>
                        <Text>Nombre de servants acquis par date</Text>
                        <Metric>{nb_servants_of_user}</Metric>
                        <AreaChart
                            className="mt-6"
                            data={servant_line_chart}
                            index="date_obtention"
                            categories={["Nombre de servants obtenus"]}
                            colors={["blue"]}
                            showAnimation={true}
                            showGradient={true}
                            yAxisWidth={40}
                        />
                    </Card>
                </Col>
                <Col>
                    <Card className="">
                        <Title>Servants par rareté</Title>
                        <DonutChart
                            className="mt-6"
                            data={nb_servant_by_rarity}
                            category="count"
                            index="title"
                            colors={["yellow", "amber", "slate", "neutral", "stone"]}
                            showAnimation={true}
                            variant={"pie"}
                        />
                    </Card>
                </Col>
                <Col>
                    <Card className="">
                        <Title>Niveaux</Title>
                        <DonutChart
                            className="mt-6"
                            data={nb_servant_by_lvl}
                            category="count"
                            index="title"
                            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                            showAnimation={true}
                            variant={"pie"}
                        />
                    </Card>
                </Col>
                <Col numColSpanLg={2}>
                    <Grid numCols={1} numColsSm={2} className="gap-5">
                        <Col>
                            <Card>
                                <Title>Total Servants</Title>
                                <ProgressBar percentageValue={percent_servants} color="teal" className="mt-3" />
                                <Text>{nb_servants_of_user} / {nb_servants}</Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Title>Servants 5 ★</Title>
                                <ProgressBar percentageValue={(nb_servant_5_of_user / nb_servant_5) * 100} color="teal" className="mt-3" />
                                <Text>{nb_servant_5_of_user} / {nb_servant_5}</Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Title>Servants 4 ★</Title>
                                <ProgressBar percentageValue={(nb_servant_4_of_user / nb_servant_4) * 100} color="teal" className="mt-3" />
                                <Text>{nb_servant_4_of_user} / {nb_servant_4}</Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Title>Servants 3 ★</Title>
                                <ProgressBar percentageValue={(nb_servant_3_of_user / nb_servant_3) * 100} color="teal" className="mt-3" />
                                <Text>{nb_servant_3_of_user} / {nb_servant_3}</Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Title>Servants 2 ★</Title>
                                <ProgressBar percentageValue={(nb_servant_2_of_user / nb_servant_2) * 100} color="teal" className="mt-3" />
                                <Text>{nb_servant_2_of_user} / {nb_servant_2}</Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Title>Servants 1 ★</Title>
                                <ProgressBar percentageValue={(nb_servant_1_of_user / nb_servant_1) * 100} color="teal" className="mt-3" />
                                <Text>{nb_servant_1_of_user} / {nb_servant_1}</Text>
                            </Card>
                        </Col>
                    </Grid>
                </Col>
            </Grid>

            <Metric className={"mt-5"}>Craft Essences</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-5">
                <Col numColSpan={1} numColSpanLg={2}>
                    <Card>
                        <Title>Nombre de craft essences par type</Title>
                        <BarChart
                            className="mt-6"
                            data={nb_ce_by_category}
                            index="name"
                            categories={["Nombre de CE"]}
                            colors={["blue"]}
                            yAxisWidth={48}
                        />
                    </Card>
                </Col>
                <Col>
                    <Card className="">
                        <Title>Max Limit Break</Title>
                        <DonutChart
                            className="mt-6"
                            data={nb_ce_mlb_or_not}
                            category="count"
                            index="title"
                            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                            showAnimation={true}
                            variant={"pie"}
                        />
                    </Card>
                </Col>
                <Col>
                    <Card className="">
                        <Title>Niveaux</Title>
                        <DonutChart
                            className="mt-6"
                            data={nb_ce_by_lvl}
                            category="count"
                            index="niveau"
                            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                            showAnimation={true}
                            variant={"pie"}
                        />
                    </Card>
                </Col>
                <Card>
                    <Title>Total Craft Essences</Title>
                    <ProgressBar percentageValue={(nb_craft_essences_of_user / nb_craft_essences) * 100} color="teal" className="mt-3" />
                    <Text>{nb_craft_essences_of_user} / {nb_craft_essences}</Text>
                </Card>
                <Col>
                    <Card>
                        <Title>Craft Essences 5 ★</Title>
                        <ProgressBar percentageValue={(nb_craft_essences_5_of_user / nb_craft_essences_5) * 100} color="amber" className="mt-3" />
                        <Text>{nb_craft_essences_5_of_user} / {nb_craft_essences_5}</Text>
                    </Card>
                </Col>
                <Card>
                    <Title>Craft Essences 4 ★</Title>
                    <ProgressBar percentageValue={(nb_craft_essences_4_of_user / nb_craft_essences_4) * 100} color="amber" className="mt-3" />
                    <Text>{nb_craft_essences_4_of_user} / {nb_craft_essences_4}</Text>
                </Card>
                <Card>
                    <Title>Craft Essences 3 ★</Title>
                    <ProgressBar percentageValue={(nb_craft_essences_3_of_user / nb_craft_essences_3) * 100} color="stone" className="mt-3" />
                    <Text>{nb_craft_essences_3_of_user} / {nb_craft_essences_3}</Text>
                </Card>
                <Card>
                    <Title>Craft Essences 2 ★</Title>
                    <ProgressBar percentageValue={(nb_craft_essences_2_of_user / nb_craft_essences_2) * 100} color="teal" className="mt-3" />
                    <Text>{nb_craft_essences_2_of_user} / {nb_craft_essences_2}</Text>
                </Card>
                <Card>
                    <Title>Craft Essences 1 ★</Title>
                    <ProgressBar percentageValue={(nb_craft_essences_1_of_user / nb_craft_essences_1) * 100} color="lime" className="mt-3" />
                    <Text>{nb_craft_essences_1_of_user} / {nb_craft_essences_1}</Text>
                </Card>
            </Grid>

            <Metric className={"mt-5"}>Histoire et évenements</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-5">
                <Col numColSpan={1} numColSpanLg={2}>
                    <Card>
                        <Title>Avancement histoire</Title>
                        <ProgressBar percentageValue={95} color="cyan" className="mt-3" />
                    </Card>
                </Col>
                <Col numColSpan={1} numColSpanLg={2}>
                    <Card>
                        <Title>Avancement évennements</Title>
                        <ProgressBar percentageValue={95} color="cyan" className="mt-3" />
                    </Card>
                </Col>
                <Col numColSpan={1} numColSpanLg={2}>
                    <Card>
                        <Title>Liste des chapitres</Title>
                        <Table className="mt-5">
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Name</TableHeaderCell>
                                    <TableHeaderCell>Status</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((item) => (
                                    <TableRow key={item.name}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <Badge color="emerald">
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </Col>
                <Col numColSpan={1} numColSpanLg={2}>
                    <Card>
                        <Title>Liste des events</Title>
                        <Table className="mt-5">
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Name</TableHeaderCell>
                                    <TableHeaderCell>Status</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((item) => (
                                    <TableRow key={item.name}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <Badge color="emerald">
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </Col>
            </Grid>
        </div>
    );
}