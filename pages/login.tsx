import {TextInput, Title} from "@tremor/react";
import {useState} from "react";
import Swal from "sweetalert2";

//TODO : Remplacer Swal par les Alerts
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            email, password
        }

        Swal.fire({
            title: 'Connexion...',
            text: 'Veuillez patienter...',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Vous êtes maintenant connectés ! ',
                    confirmButtonColor: '#3b82f6',
                    confirmButtonText: 'Valider',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de la connexion.',
                    cancelButtonColor: '#dc2626',
                    cancelButtonText: 'Annuler',
                });
            }
        }).catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la connexion.',
                cancelButtonColor: '#dc2626',
                cancelButtonText: 'Annuler',
            });
        });
    }

    return (
        <div className={"my-auto"}>
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-lg">
                        <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg" style={{ backgroundImage: "url('/images/login-register/wallpaper.jpg')" }}></div>
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Bienvenue</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                                        Email
                                    </label>
                                    <TextInput onChange={(e) => setEmail(e.target.value)} id="username" type="text" placeholder="Email"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Mot de passe
                                    </label>
                                    <TextInput onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="******************"/>
                                </div>
                                <div className="mb-6 text-center">
                                    <button onClick={(e) => { handleSubmit(e) }}
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Connexion
                                    </button>
                                </div>
                                <hr className="mb-6 border-t"/>
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="#"
                                    >
                                        Vous n'avez pas de compte ?
                                    </a>
                                </div>
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="#"
                                    >
                                        Mot de passe oublié ?
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login