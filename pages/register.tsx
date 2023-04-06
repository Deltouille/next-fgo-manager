import {TextInput, Title} from "@tremor/react";
import {useState} from "react";
import Swal from 'sweetalert2';
import Link from "next/link";
const Register = () => {
    //TODO : Faire la vérification de l'email
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordVerif, setPasswordVerif] = useState();
    const [isVerifPasswordValid, setIsVerifPasswordValid] = useState(false)
    const [passwordVerifErrorMessage, setPasswordVerifErrorMessage] = useState('');

    const checkPasswordRegex = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    const checkIfPasswordMatches = (password, verifPassword) => {
        if(password === verifPassword){
            return true
        }else{
            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isMainPasswordValid = checkPasswordRegex(password); //On vérifie que le mot de passe utilisateur est conforme a la regex
        if(!isMainPasswordValid){ //Si ça ne l'est pas, on met le TextInput en mode Erreur avec un message
            setIsPasswordValid(true);
            setPasswordErrorMessage('Votre mot de passe doit contenir au moins 1 majuscule, 1 chiffre, 1 symbôle et doit faire minimum 8 caractères')
        }else{ //Sinon tout vas bien
            setIsPasswordValid(false);
            setPasswordErrorMessage('');
            const isBothPasswordTheSame = checkIfPasswordMatches(password, passwordVerif); //On vérifie que les 2 mots de passes sont les mêmes
            if(isBothPasswordTheSame){ //Si c'est le cas, on procéde a l'enregistrement
                setPasswordVerifErrorMessage('');
                setIsVerifPasswordValid(false)
                let data = {
                    email, password, passwordVerif
                }
                Swal.fire({
                    title: 'Enregistrement en cours...',
                    text: 'Veuillez patienter...',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                    }
                });

                fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then((res) => {
                    if(res.status === 200){
                        Swal.fire({
                            icon: 'success',
                            title: 'Succès',
                            text: 'Votre compte as bien été créer ! ',
                            confirmButtonColor: '#3b82f6',
                            confirmButtonText: 'Valider',
                        });
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur',
                            text: 'Une erreur est survenue lors de la création du compte',
                            cancelButtonColor: '#dc2626',
                            cancelButtonText: 'Annuler',
                        });
                    }
                }).catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Une erreur est survenue lors de la création du compte.',
                        cancelButtonColor: '#dc2626',
                        cancelButtonText: 'Annuler',
                    });
                })

            }else{
                setPasswordVerifErrorMessage('Les mots de passe ne correspondent pas');
                setIsVerifPasswordValid(true)
            }
        }

    }

    return (
        <div className={"my-auto"}>
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-lg">
                        <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg" style={{ backgroundImage: "url('https://source.unsplash.com/K4mSJ7kc0As/600x800')" }}></div>
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Création du compte</h3>
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
                                    <TextInput onChange={(e) => {setPassword(e.target.value);}} error={isPasswordValid} errorMessage={passwordErrorMessage} id="password" type="password" placeholder="******************"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Vérification du mot de passe
                                    </label>
                                    <TextInput error={isVerifPasswordValid} errorMessage={passwordVerifErrorMessage} onChange={(e) => setPasswordVerif(e.target.value)} id="password" type="password" placeholder="******************"/>
                                </div>
                                <div className="mb-6 text-center">
                                    <button onClick={(e) => handleSubmit(e)} className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                                        S'enregistrer
                                    </button>
                                </div>
                                <hr className="mb-6 border-t"/>
                                <div className="text-center">
                                    <Link className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="/login">
                                        Vous avez déjà un compte ?
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register