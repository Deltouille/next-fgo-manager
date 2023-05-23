import {useState} from "react";
import Swal from 'sweetalert2';
import Link from "next/link";

const Register = () => {
    //TODO : Faire la vérification de l'email
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordVerif, setPasswordVerif] = useState();
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isVerifPasswordValid, setIsVerifPasswordValid] = useState(true);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordVerifErrorMessage, setPasswordVerifErrorMessage] = useState('');

    /**
     * Fonction qui vas vérifier si le mot de passe est conforme a la regex
     * @param password
     */
    const checkPasswordRegex = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    /**
     * Fonction qui vas vérifier si les mot de passe correspondent entre eux
     * @param password
     * @param verifPassword
     */
    const checkIfPasswordMatches = (password: string, verifPassword: string) => {
        return password === verifPassword;
    }

    /**
     * Fonction qui permet d'enregistrer un utilisateur.
     * Vérifie la compléxité et la correspondance des mots de passe avant d'enregistrer l'utilisateur.
     * @param e
     */
    const registerUser = async(e) => {
        e.preventDefault();

        const isMainPasswordValid = checkPasswordRegex(password);
        const areBothPasswordTheSame = checkIfPasswordMatches(password, passwordVerif);

        if(isMainPasswordValid && areBothPasswordTheSame) {
            setIsPasswordValid(true);
            setIsVerifPasswordValid(true);
            setPasswordErrorMessage('');
            setPasswordVerifErrorMessage('');

            let data = { email, password, passwordVerif };

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
            if(!isMainPasswordValid){
                setIsPasswordValid(false);
                setPasswordErrorMessage('Votre mot de passe doit contenir au moins 1 majuscule, 1 chiffre, 1 symbôle et doit faire minimum 8 caractères');
            }

            if(!areBothPasswordTheSame){
                setIsVerifPasswordValid(false);
                setPasswordVerifErrorMessage('Les mots de passe ne correspondent pas');
            }
        }
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
                                <span className="label-text">Mot de passe</span>
                            </label>
                            <input onChange={(e) => {setPassword(e.target.value);}} id="password" type="password" placeholder="******************" className="input input-bordered" />
                            <p className={"text-red-600 text-xs"}>{passwordErrorMessage}</p>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Vérification du mot de passe</span>
                            </label>
                            <input onChange={(e) => setPasswordVerif(e.target.value)} id="password" type="password" placeholder="******************" className="input input-bordered" />
                            <p className={"text-red-600 text-xs"}>{passwordVerifErrorMessage}</p>
                        </div>
                        <div className="form-control mt-6">
                            <button onClick={(e) => registerUser(e)} type="button" className="btn bg-blue-600 hover:bg-blue-500 border-none">S'enregistrer</button>
                        </div>
                        <hr className="mb-6 border-t"/>
                        <div className="text-center">
                            <Link className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="login">
                                Vous avez déjà un compte ?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register