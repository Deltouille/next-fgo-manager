import {Grid, Col, Card, Text, Metric, Title, LineChart, Divider, BarChart, Subtitle, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge} from "@tremor/react";
import {ProgressBar, MarkerBar, DeltaBar, RangeBar, CategoryBar} from "@tremor/react";
export default function Profil(){
    const lineChartDataServants = [
        {
            year: 1951,
            "Nombre de servants obtenus": 10,
        },
        {
            year: 1952,
            "Nombre de servants obtenus": 20,
        },
        {
            year: 1953,
            "Nombre de servants obtenus": 40,
        },
        {
            year: 1954,
            "Nombre de servants obtenus": 6,
        },
        {
            year: 1955,
            "Nombre de servants obtenus": 50,
        },
    ];

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
        <div className={""}>
            <Metric>Servants</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                <Col numColSpan={1} numColSpanLg={3}>
                    <Card>
                        <Text>Servants</Text>
                        <Title>280</Title>
                        <LineChart
                            className="mt-6"
                            data={lineChartDataServants}
                            index="year"
                            categories={["Nombre de servants obtenus"]}
                            colors={["blue"]}
                            yAxisWidth={40}
                        />
                    </Card>
                </Col>
                <Card>
                    <Title>Total Servants</Title>
                    <ProgressBar percentageValue={80} color="teal" className="mt-3" />
                </Card>
                <Col>
                    <Card>
                        <Title>Servants 5 ★</Title>
                        <ProgressBar percentageValue={70} color="teal" className="mt-3" />
                    </Card>
                </Col>
                <Card>
                    <Title>Servants 4 ★</Title>
                    <ProgressBar percentageValue={60} color="teal" className="mt-3" />
                </Card>
                <Card>
                    <Title>Servants 3 ★</Title>
                    <ProgressBar percentageValue={45} color="teal" className="mt-3" />
                </Card>
                <Card>
                    <Title>Servants 2 ★</Title>
                    <ProgressBar percentageValue={100} color="teal" className="mt-3" />
                </Card>
                <Card>
                    <Title>Servants 1 ★</Title>
                    <ProgressBar percentageValue={100} color="teal" className="mt-3" />
                </Card>
            </Grid>

            <Metric className={"mt-5"}>Craft Essences</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-5">
                <Col numColSpan={1} numColSpanLg={3}>
                    <Card>
                        <Title>Number of species threatened with extinction (2021)</Title>
                        <Subtitle>
                            The IUCN Red List has assessed only a small share of the total known
                            species in the world.
                        </Subtitle>
                        <BarChart
                            className="mt-6"
                            data={barChartCE}
                            index="name"
                            categories={["Number of threatened species"]}
                            colors={["blue"]}
                            yAxisWidth={48}
                        />
                    </Card>
                </Col>
                <Card>
                    <Title>Total Craft Essences</Title>
                    <ProgressBar percentageValue={80} color="teal" className="mt-3" />
                </Card>
                <Col>
                    <Card>
                        <Title>Craft Essences 5 ★</Title>
                        <ProgressBar percentageValue={70} color="amber" className="mt-3" />
                    </Card>
                </Col>
                <Card>
                    <Title>Craft Essences 4 ★</Title>
                    <ProgressBar percentageValue={60} color="amber" className="mt-3" />
                </Card>
                <Card>
                    <Title>Craft Essences 3 ★</Title>
                    <ProgressBar percentageValue={45} color="stone" className="mt-3" />
                </Card>
                <Card>
                    <Title>Craft Essences 2 ★</Title>
                    <ProgressBar percentageValue={100} color="teal" className="mt-3" />
                </Card>
                <Card>
                    <Title>Craft Essences 1 ★</Title>
                    <ProgressBar percentageValue={100} color="lime" className="mt-3" />
                </Card>
            </Grid>

            <Metric className={"mt-5"}>Craft Essences</Metric>
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