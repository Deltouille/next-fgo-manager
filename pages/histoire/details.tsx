import {fetchStoryEventDetails} from "@/lib/api";
import {Divider, Metric, Title} from "@tremor/react";

export const getServerSideProps = async () => {
    const war_details = await fetchStoryEventDetails(101);

    console.log(war_details);

    return {
        props: {
            war_details
        }
    }
}

export default function Details ({war_details}) {
    return (
        <div className="mx-auto p-4 w-5/6">
            <Metric>{war_details.longName}</Metric>
            <Divider/>
            <div className="flex flex-col lg:flex-row pb-4 gap-5">
                <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered w-full" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Arc narratif</option>
                    <option>Observer over Timeless Temple</option>
                    <option>Epic of Remnant</option>
                    <option>Cosmos in the Lostbelt</option>
                    <option>Ordeal Call</option>
                </select>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Trier par état</option>
                    <option>En attente</option>
                    <option>En cours</option>
                    <option>Terminé</option>
                </select>
            </div>
            <div className={"grid grid-cols-4 gap-10"}>
                {war_details.spots.map((current_spot) => {
                    return (
                        <div className={"div flex"}>
                            <img className={"w-32"} src={current_spot.image}/>
                            <div className={"flex flex-col"}>
                                <Title>{current_spot.name}</Title>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}