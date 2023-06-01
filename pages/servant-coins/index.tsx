import {fetchMaterialData} from "@/lib/api";
import Alert from "@/components/Alert";
import {Divider, Metric} from "@tremor/react";

export const getServerSideProps = async () => {
    const materials = await fetchMaterialData();

    const servant_coins = materials.filter((current_categ: object) => current_categ.type === "svtCoin");

    return {
        props: {
            servant_coins
        }
    }
}

export default function ServantCoins({ servant_coins }) {
    return (
        <div className="mx-auto p-4 w-5/6">
            <Metric>Servant Coin</Metric>
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
            </div>
            <div className={"grid grid-cols-4 lg:grid-cols-8 gap-5"}>
                {servant_coins.map((current_svt_coin) => {
                    return (
                        <div className={"relative"}>
                            <img className={"mx-auto"} src={current_svt_coin.icon} alt={"svt_coin"}/>
                            <div className="badge badge-lg bg-gray-700 absolute -translate-x-1/2 left-1/2 bottom-1">0</div>
                        </div>
                    );
                })};
            </div>
        </div>
    );
}