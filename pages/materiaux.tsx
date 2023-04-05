import {Grid, Col, Card, Text, Metric, Divider} from "@tremor/react";

export default function Materiaux () {
    return (
        <>
            <Metric>Bronze</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                <Card decoration="left" decorationColor="stone">
                    <Text>Fangs</Text>
                    <Metric>500</Metric>
                </Card>
                <Card decoration="left" decorationColor="stone">
                    <Text>Bones</Text>
                    <Metric>441</Metric>
                </Card>
                <Card decoration="left" decorationColor="stone">
                    <Text>Proof of Heroes</Text>
                    <Metric>123</Metric>
                </Card>
            </Grid>

            <Metric className={"mt-5"}>Silver</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                <Card decoration="left" decorationColor="slate">
                    <Text>Crystal</Text>
                    <Metric>200</Metric>
                </Card>
                <Card decoration="left" decorationColor="slate">
                    <Text>Eternal Gear</Text>
                    <Metric>302</Metric>
                </Card>
                <Card decoration="left" decorationColor="slate">
                    <Text>Pages</Text>
                    <Metric>30</Metric>
                </Card>
            </Grid>

            <Metric className={"mt-5"}>Gold</Metric>
            <Divider></Divider>
            <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                <Card decoration="left" decorationColor="amber">
                    <Text>Heart of a Foreign God</Text>
                    <Metric>KPI 2</Metric>
                </Card>
                <Card decoration="left" decorationColor="amber">
                    <Text>Crystallized Lore</Text>
                    <Metric>0</Metric>
                </Card>
                <Card decoration="left" decorationColor="amber">
                    <Text>Egg of Truth</Text>
                    <Metric>21</Metric>
                </Card>
            </Grid>
        </>
    );
}