import {Grid, Col, Card, Text, Metric, Title, LineChart, Divider, BarChart, Subtitle, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge} from "@tremor/react";
import {ProgressBar, MarkerBar, DeltaBar, RangeBar, CategoryBar} from "@tremor/react";
export default function ListeDesServants() {
    const data = [
        {
            name: "Viola Amherd",
            Role: "Saber",
            departement:
                "★★★★★",
            status: "active",
        },
        {
            name: "Simonetta Sommaruga",
            Role: "Archer",
            departement:
                "★★",
            status: "active",
        },
        {
            name: "Alain Berset",
            Role: "Lancer",
            departement: "★★",
            status: "active",
        },
        {
            name: "Ignazio Cassis",
            Role: "Saber",
            departement: "★★★★★",
            status: "active",
        },
        {
            name: "Ueli Maurer",
            Role: "Berserker",
            departement: "★★★★",
            status: "active",
        },
        {
            name: "Guy Parmelin",
            Role: "Ruler",
            departement:
                "★★★",
            status: "active",
        },
        {
            name: "Karin Keller-Sutter",
            Role: "Archer",
            departement: "★★★★★",
            status: "active",
        },
    ];
    return(
        <>
            <Card>
                <Title>Liste des servants</Title>
                <Table className="mt-5">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Classe</TableHeaderCell>
                            <TableHeaderCell>Rareté</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Text>{item.Role}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.departement}</Text>
                                </TableCell>
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
        </>
    );
}