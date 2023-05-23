const ServantCard = ({servant_name, servant_class, servant_face, servant_stars}) => {
    return (
        <div className="card w-96 bg-white text-gray-900 hover:shadow-lg transition-all duration-500 border">
            <div className="card-body">
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={servant_face.ascension[Object.keys(servant_face.ascension)[Object.keys(servant_face.ascension).length - 1]]} alt="Avatar Tailwind CSS Component" loading={"lazy"}/>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{servant_name}</div>
                        <div className="text-sm opacity-50 capitalize">{servant_class} - {servant_stars}</div>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    {/**<button className="btn btn-sm" onClick={() => addServant(item) }>Ajouter</button>*/}
                </div>
            </div>
        </div>
    );
}

export default ServantCard;