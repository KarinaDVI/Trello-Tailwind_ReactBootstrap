import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import Dropdown from './atoms/dropdown'
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useDarkMode } from './utils/DarkModeContext'
import SwitchColorMode from './atoms/SwitchColorMode'

export default function Header() {
  
    const {user, logout} = UserAuth();
    const {darkMode}= useDarkMode();
    const navigate = useNavigate();
    const blueLight=darkMode?"bg-gray-900":"bg-blue-dark"
    const textLight=darkMode?'text-gray-100':'text-gray-100'
    const handleLogout = async () =>{
       try{
        await logout()
        navigate('/')
        console.log("Saliste!")
       } catch(e){
        console.log(e.message)
       }
    }
    const alertInfo = ()=>{
     
      Swal.fire({
        title: 'Realizado con React Bootstrap y Tailwind',
        text: "(Si, ya sé que no se podía...)",
        icon: 'info',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }

  return (
    <div className={`fixed-top justify-content-between w-full ${blueLight}`}>
            <div className={`flex items-center mx-4 mb-2 ${blueLight}`}>
                <div className="hidden md:flex justify-start">
                    <button className={`${blueLight} rounded p-2 font-bold text-white text-sm mr-2 flex`}>
                        <svg className="fill-current text-white h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M41 4H9C6.24 4 4 6.24 4 9v32c0 2.76 2.24 5 5 5h32c2.76 0 5-2.24 5-5V9c0-2.76-2.24-5-5-5zM21 36c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v24zm19-12c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v12z"/></svg>
                        Pannels
                    </button>
                </div>
                <div className="mx-0 md:mx-auto">
                    <h1 className={`${textLight} text-xl flex items-center font-sans italic`}>
                        <svg className="fill-current h-8 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M41 4H9C6.24 4 4 6.24 4 9v32c0 2.76 2.24 5 5 5h32c2.76 0 5-2.24 5-5V9c0-2.76-2.24-5-5-5zM21 36c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v24zm19-12c0 1.1-.9 2-2 2h-7c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2v12z"/></svg>
                        TrelloKa
                    </h1>
                </div>
                <div className={`flex sm-block items-center ml-auto p-4 ${blueLight}`}>
                    <button className="rounded h-8 w-8 font-bold text-white text-sm mr-2">+</button>
                    <button className="rounded h-8 w-8 font-bold text-white text-sm mr-2">i</button>
                    <button className="rounded h-8 w-8 font-bold text-white text-sm mr-2">
                        <svg className="h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z"/></svg>
                    </button>
                    <a href="https://www.linkedin.com/in/karina-beatriz-bouza"><img src="https://i.ibb.co/2gBQbhT/IMG-20220722-153306261.jpg" className="rounded-full w-[2rem]" /></a>
                    
                    <div className="grid justify-items-end mx-4 px-4">
                        

                        <p className="text-white">{user && user.email} </p>
                        <Button className="text-white text-sm mr-2 pb-2" onClick={handleLogout} >Salir</Button>
                        <SwitchColorMode/>
                    </div>
                </div >
                
            </div>
            
           
            <div className="flex justify-between p-4 m-4">
                <div className="flex">
                    <h3 className={`${textLight} mr-4`}>TailwindComponents.com</h3>
                    <ul className={`list-reset ${textLight} hidden md:flex`}>
                        <li><span className="font-bold text-lg px-2">☆</span></li>
                        <li><span className={`border-l ${blueLight} px-2 text-sm`}>Business Name</span> <span className={`rounded-lg ${blueLight} text-xs px-2 py-1`}>Free</span></li>
                        <li><span className={`border-l ${blueLight} px-2 text-sm ml-2`}>Team Visible</span></li>
                        <li><a href="https://karinadvi.github.io/lista_tareas-KB/"><span className={`border-l ${blueLight} px-2 text-sm ml-2`}>Lista de tareas javascript</span></a></li>
                    </ul>
                </div>
                
                <Dropdown textvar="ShowMenu"
                          classvar={`h-4 fill-current text-gray-100 cursor-pointer mr-2`}
                          execOnClick={alertInfo}
                          textDrop="Info"
                />
    
            </div>
    </div>
  )
}
