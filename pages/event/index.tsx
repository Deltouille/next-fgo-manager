import {fetchStoryData} from "@/lib/api";

const getServerSideProps = async () => {
    const liste_war = await fetchStoryData();

    let events: [] = [];

    console.log(liste_war);

    return {
        props: {
            liste_war
        }
    }
}

export default function Events({liste_war}) {
    console.log(liste_war);
    return (
        <>

        </>
    );
}