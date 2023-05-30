import Link from "next/link";

export default function ContentWrapper({children}) {
    return (
        <div className="drawer drawer-mobile bg-blue-900">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
            <div className="drawer-content">
                <div className={"bg-white min-h-screen"}>
                    {children}
                </div>
            </div>
            <div className="drawer-side lg:m-4">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-blue-900 text-white shadow-lg lg:rounded-box">
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <Link href={"profil"} className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Profil
                        </Link>
                    </li>
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <a className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Servants
                        </a>
                    </li>
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <a className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Craft Essences
                        </a>
                    </li>
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <a className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Mes Matériaux
                        </a>
                    </li>
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <a className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Histoire
                        </a>
                    </li>
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <a className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Events
                        </a>
                    </li>
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <a className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Servant Coins
                        </a>
                    </li>
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <a className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Gestionnaire
                        </a>
                    </li>
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <a className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Plannificateur
                        </a>
                    </li>
                    <li className={"hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-xl"}>
                        <a className={"font-semibold text-lg text-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            Statistiques Globales
                        </a>
                    </li>
                </ul>

            </div>
        </div>
    );
}