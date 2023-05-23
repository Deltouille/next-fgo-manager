import {TextInput, Title} from "@tremor/react";
import {useState} from "react";
import Swal from "sweetalert2";
import Link from "next/link";

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
        <div className="hero min-h-screen" style={{ backgroundImage: `url("/images/login-register/wallpaper.jpg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-16">
                    <div className="card-body">
                        <h1 className="font-semibold text-3xl text-center">Connexion</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input className="input input-bordered" onChange={(e) => setEmail(e.target.value)} id="username" type="text" placeholder="email@mail.fr"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="******************" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Mot de passe oublié ?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={(e) => { handleSubmit(e) }} type="button" className="btn bg-blue-600 hover:bg-blue-500 border-none">Connexion</button>
                        </div>
                        <hr className="mb-6 border-t"/>
                        <div className="text-center">
                            <Link className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="register">
                                Vous n'avez pas de compte ?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login