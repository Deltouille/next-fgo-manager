interface Alert {
    etat: string,
    message: string
}

const Alert = ({message, etat}) => {
    if(etat === "information"){
        return (
            <div className="fixed z-10 top-0 right-0 w-3/4 lg:w-1/4 mr-5 mt-5 animate__slideInRight">
                <div className="bg-blue-600 w-full shadow-lg rounded flex justify-center items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <p className="my-auto py-2">{message}</p>
                </div>
            </div>

        );
    }

    if(etat === "validation"){
        return (
            <div className="fixed z-10 top-0 right-0 w-3/4 lg:w-1/4 mr-5 mt-5 animate__slideInRight">
                <div className="bg-green-600 w-full shadow-lg rounded flex justify-center items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="my-auto py-2">{message}</p>
                </div>
            </div>

        );
    }

    if(etat === "erreur"){
        return (
            <div className="fixed z-10 top-0 right-0 w-3/4 lg:w-1/4 mr-5 mt-5 animate__slideInRight">
                <div className="bg-red-600 w-full shadow-lg rounded flex justify-center items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="my-auto py-2">{message}</p>
                </div>
            </div>

        );
    }

}

export default Alert