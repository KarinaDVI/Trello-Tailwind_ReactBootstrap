import React, { useState, useEffect, useRef } from "react";
import "./Frame.css";
import TaskFrame from "./molecule/TaskFrame";
import DragAndDrop from "./utils/DragAndDrop";
import InputTask from "./atoms/InputTask";
import Dropdown from "./atoms/Dropdown";
/* Firebase imports */
import {useNavigate} from 'react-router-dom';
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore';
import {addDoc} from 'firebase/firestore';
import { db } from "../assets/firebaseConfig/firebase";
import {async} from '@firebase/util';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import InputMList from './atoms/InputMList';

const MySwal = withReactContent(Swal);

/*  */

export default function Frame({titleList, idl, setIdl, confirmDeleteL, 
                              confirmModifyL, handleAddList, 
                              setTitleList, cancelList, valor, 
                              modify, setModify, setValor
                              }) {
  const [idc, setIdc] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [textoVar, setTextoVar] = useState('');
  const [priority, setPriority] = useState(false);
  
  const navigate = useNavigate();

  /* Firebase */
 //2 referenciamos la bd

 const TaskCollection = collection(db, "Tareas");

 //Creacion de tareas
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
    const getTasks = async() => {
        
      const data = await getDocs(TaskCollection);
      setTasks(
          data.docs.map((docc)=>({...docc.data(), id:docc.id}))
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
  //Borrar tarea
 const quitTask =async (id)=>{
    const taskDoc = doc(db, "Tareas", id);
    await deleteDoc(taskDoc);
    getTasks();
  }

//Borrado de tareas
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

/*  Fin de modificar */
  const addCard = async (textoVar) => {

    await addDoc(TaskCollection, {Descripcion: textoVar, prioridad: priority, lista: idl });
    getTasks();
  };

  const handleAddCard = () => {
    addCard(textoVar);
    setTextoVar('');

  };
  
  return (
      <div className="rounded bg-grey-light flex-no-shrink w-64 p-2 mr-3 max-h-screen my-2 overflow-y-scrool overflow-visible" >
        <div className="flex justify-between pt-1">
          {/* Falta desarrollar que haya que hacer click y saltar a input
               Declarar estos estados en list: [modif, setModif] */}
          { !modify?
            (<h3 className="text-sm break-all px-2" onClick={()=>
              setModify(true)}>{titleList}</h3>):
            (<InputMList
              idl={idl}
              setIdl={setIdl}
              handleAddList={handleAddList}
              titleList={titleList}
              setTitleList={setTitleList}
              cancelList={cancelList}
              modify={modify}
              setModify={setModify}
              valor={valor}
              setValor={setValor}
            />)

          }
        <Dropdown
          textvar=""
          classvar="h-4 fill-current text-grey-dark cursor-pointer"
          confirmDeleteL={() => confirmDeleteL(idl)} // Pass the handleDeleteList function as a prop

       />
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
