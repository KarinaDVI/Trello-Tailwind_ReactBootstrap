import { signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState, useRef, useEffect} from 'react';
import { auth } from '../assets/firebaseConfig/firebase';
import {Link, useNavigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


export default function HomeLogin() {
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const navigate = useNavigate();
const {signIn} = UserAuth();
const {forgotPassword} = UserAuth();
const [errorMessage, setErrorMessage] =useState('')
const emailRef = useRef();

const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        await signIn(loginEmail, loginPassword)
        navigate('/home/:userId');
    }catch(e){
        console.log(e.message)
        setErrorMessage('Usuario o contraseña incorrectos. Prueba de nuevo')
        /* navigate('/') */
    }
}
const forgotPasswordHandler = (e) => {
  e.preventDefault();
  const email = emailRef.current.value;
  if (email) {
    forgotPassword(email)
      .then(() => {
        emailRef.current.value = "";
        setErrorMessage("Se ha enviado un mail de recuperación a la direccion ingresadda. Por favor verifique su casilla"); 
      })
      .catch((error) => {
        
        setErrorMessage("No existe un usuario registrado con ese nombre. Prueba de nuevo");
      });
  } else {
    setErrorMessage("Por favor, ingresa una dirección de email válida."); 
  }
};

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">    
      <div className="w-full max-w-md">
        <a className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <svg className="w-10 h-10 mr-2" fill="rgb(79, 70, 229)" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Logueate en tu cuenta
                </h2>
            
              <form className="space-y-4 md:space-y-6" action="#" onSubmit = {handleSubmit} method="POST">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Direccion de email
                  </label>
                  <div className="mt-2">
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e)=>setLoginEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className='block sm:flex justify-between '>
                      <label htmlFor="password" className="block sm:flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Contraseña
                      </label>
                      <div className="block sm:flex text-sm pb-2 sm:justify-right">
                        <a href="#" onClick={(forgotPasswordHandler)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                          *Olvidaste la contraseña?
                        </a>
                      </div>
                    </div> 
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e)=>setLoginPassword(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                  <button
                    type="submit"
                    className="w-full text-white  hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                  >
                    Loguearse
                  </button>
                  <div className="text-sm font-semibold leading-6 text-gray-500 m-10" >{errorMessage}</div>
                
                <p className="mt-10 text-center text-sm font-light text-gray-500 dark:text-gray-400">
                No tienes cuenta?{' '}
                <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Registrarse
                </Link>
              </p>
              </form>
            </div>
          </div>
        </div>
    </section>
  )
}
