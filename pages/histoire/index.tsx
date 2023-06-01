import {fetchStoryData} from "@/lib/api";
import {Card, Col, Divider, Grid, Metric, Text, Title, Button, Flex} from "@tremor/react";

export const getServerSideProps = async () => {

    const chapters = await fetchStoryData();

    let story_chapters: [] = [];

    story_chapters = chapters
        .filter((current_chapter) => {
            return current_chapter.flags.includes("mainScenario") && current_chapter.flags.includes("isWarIconLeft");
        })
        .map((current_chapter) => {
                return {
                    name: current_chapter.longName,
                    type: "Story",
                    id: current_chapter.id
                };
        });

    return {
        props: {
            story_chapters
        }
    }
}

export default function Histoire({story_chapters}){
    return(
        <div className="mx-auto p-4 w-5/6">
            <Metric>Chapitres d'histoire</Metric>
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
                    <option disabled selected>Arc narratif</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Trier par état</option>
                    <option>Saber</option>
                    <option>Archer</option>
                    <option>Lancer</option>
                </select>
            </div>
        </div>
    );
}