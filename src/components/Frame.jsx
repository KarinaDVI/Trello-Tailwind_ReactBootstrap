import React, { useState, useEffect } from "react";
import "./Frame.css";
import TaskFrame from "./molecule/TaskFrame";
import DragAndDrop from "./utils/DragAndDrop";
import InputTask from "./atoms/InputTask";

/* Firebase imports */
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore';
import {addDoc} from 'firebase/firestore';
import { db } from "../assets/firebaseConfig/firebase";
import {async} from '@firebase/util';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/*  */

export default function Frame({titleList, idl}) {
  const [idc, setIdc] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [textoVar, setTextoVar] = useState('');
  const [priority, setPriority] = useState(false);
  const [background, setBackground] = useState("bg-white");
  /* const [numero, setNumero] = useState(0); */

  /* Firebase hooks */
 
  /* const [textoVar, setTExtovar] = useState(""); */
 /*  const [priority, setPriority] = useState(); */
  const navigate = useNavigate();
    /* Firebase modificar */
    /* const [tasks, setTasks] = useState([]); */
    /*  */

  /*  */

  /* Firebase */
 //2 referenciamos la bd

 const TaskCollection = collection(db, "Tareas");

 //3 alerta de creacion

 const alertaCreacion = ()=>{
     Swal.fire({
     title: 'Tarea Creada',
     showClass: {
         popup: 'animate__animated animate__fadeInDown'
     },
     hideClass: {
         popup: 'animate__animated animate__fadeOutUp'
     }
     });
 }

    /* Mostrar firebase */
    const getTasks = async () => {
        
      const data = await getDocs(TaskCollection);
      //console.log(data.docs);
      setTasks(
          data.docs.map((docc)=>({...docc.data(), id:docc.id}))
          //console.log(Tasks);
      )
  }
  /* Actualiza valores */
    useEffect(()=>{
      getTasks();
  }, [])

  /*  */

  const newTask = () => {
    setShowInput(true);
  };
  const cancelTask =()=>{
    setShowInput(false);
  }
 const quitTask =async (id)=>{
  /*  tasks.forEach((task)=>console.log(task.id,task.Descripcion, task.prioridad))
  setTasks(tasks.filter((task)=>task.id!=id)) 
 */
    const taskDoc = doc(db, "Tareas", id);
    await deleteDoc(taskDoc);
    getTasks();
  }

 /* Firebase */
 const confirmDelete = (id)=>{
  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          quitTask(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
}
 /*  */

  const addCard = async (textoVar) => {
   /*  setIdc(idc + 1);
  
    const newTask = {
      id: idc,
      texto: textoVar,
      priority: priority,
    };
    setTasks([...tasks, newTask]); */

    /* Firebase */
    await addDoc(TaskCollection, {Descripcion: textoVar, prioridad: priority, lista: idl });
    alertaCreacion();
    getTasks();
     /*  */
    /*  */
  };
  

  const handleAddCard = () => {
    
    addCard(textoVar);
    setTextoVar('');

  };
 
  return (
      <div className="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3 max-h-screen overflow-y-scrool overflow-x-hidden" >
        <div className="flex justify-between py-1">
          <h3 className="text-sm">{titleList}</h3>
          <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
        </div>

        {tasks.map((task) => {
        if (task.lista === idl) {
          return (
            <TaskFrame
              key={task.id}
              texto={task.Descripcion}
              idc={task.id}
              drag={DragAndDrop.drag}
              confirmDelete={() => confirmDelete(task.id)}
              background={task.prioridad ? "bg-red-400" : "bg-white"}
            />
          );
        }
        return null;
      })}
        {showInput ? (
          <InputTask 
              idc={idc} 
              setIdc={setIdc} 
              handleAddCard={handleAddCard} 
              textoVar={textoVar} 
              setTextoVar={setTextoVar} 
              cancelTask={cancelTask}
              setPriority={setPriority} 
              />
        ) : (
          <a href="#" onClick={newTask}>
            <p className="mt-3 text-grey-dark text-sm">+Añada una tarjeta...</p>
          </a>
        )}
      </div>
  );
}
