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
    Flex,
    SelectBox,
    SelectBoxItem, TextInput
} from "@tremor/react";

interface TableCollectionServantComponent {
    data: object
}

const TableCollectionServantComponent: ({data}: { data: object }) => void = ({data}) => {

    const { header, body } = data;

    return (
        <>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        {header.map((current_header) => {
                            <TableHeaderCell>{current_header.title}</TableHeaderCell>
                        })}
                    </TableRow>
                </TableHead>
            </Table>
        </>
    )


}

export default TableCollectionServantComponent;