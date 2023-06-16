import {fetchEventData, fetchStoryData} from "@/lib/api";
import {Divider, Metric, Title} from "@tremor/react";

export const getServerSideProps = async () => {
    const liste_war = await fetchEventData();

    let events: [] = [];

    events = liste_war
        .filter((current_chapter) => {
            return current_chapter.flags.includes("isEvent");
        })
        .map((current_chapter) => {
            return {
                name: current_chapter.longName,
                type: "Story",
                id: current_chapter.id,
                banner: current_chapter.banner
            };
        });

    console.log(liste_war);

    return {
        props: {
            events
        }
    }
}

export default function Events({events}) {
    return (
        <div className="mx-auto p-4 w-5/6">
            <Metric>Évennements</Metric>
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
                <input type="date" placeholder="Date début" className="input input-bordered w-full max-w-xs"/>
                <input type="date" placeholder="Date fin" className="input input-bordered w-full max-w-xs"/>
            </div>
            <div className={"grid grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-5"}>
                {events.map((current_chapter) => {
                    console.log(current_chapter);
                    return (
                        <div className={"flex flex-col border border-gray-300 rounded p-4"}>
                            <img className={"-mt-3"} src={current_chapter.banner}/>
                                <Title className={""}>{current_chapter.name}</Title>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}