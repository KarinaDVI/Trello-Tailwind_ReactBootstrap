import React, { useState, useEffect, useRef } from "react";
import "./Frame.css";
import Task from "./atoms/Task";
import DragAndDrop from "./utils/DragAndDrop";
import InputTask from "./atoms/InputTask";
import Dropdown from "./atoms/Dropdown";
/* Firebase imports */
import {useNavigate} from 'react-router-dom';
import {collection, getDocs, getDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';
import {addDoc} from 'firebase/firestore';
import { db } from "../assets/firebaseConfig/firebase";
import {async} from '@firebase/util';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import InputMList from './atoms/InputMList';
import { useDarkMode } from './utils/DarkModeContext';
import { useDrop } from "react-dnd";
import { ItemTypes } from "./utils/DragandDropTypes";



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
  const {darkMode} = useDarkMode();
  const MySwal = withReactContent(Swal);
  const TaskCollection = collection(db, "Tareas");

  /* Drag and drop */
   
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => {
      console.log('Item dropped:', item);
      console.log('Dropped into list idl:', idl);
  
      const updatedTasks = tasks.map((task) =>
        task.id === item.idc ? { ...task, lista: idl } : task
      );
      setTasks(updatedTasks);
      // Update the task's lista field in Firebase
      updateTaskListaInFirebase(item.idc, idl)
    },
  });
  
  const updateTaskListaInFirebase = async (taskId, newListId) => {
    const taskRef = doc(db, 'Tareas', taskId);
    await updateDoc(taskRef, { lista: newListId })
    await getTasks()
  };

  /*  */

 

  /* getTasks original */
 /*  const getTasks = async() => {
    const data = await getDocs(TaskCollection);
    setTasks(
        data.docs.map((docc)=>({...docc.data(), id:docc.id}))
    )
  } */

/* getTasks con filtro por idl */
  const getTasks = async () => {
  const data = await getDocs(TaskCollection);
  const allTasks = data.docs.map((docc) => ({ ...docc.data(), id: docc.id }));
  // Filtrar las tareas que pertenecen a la lista actual (con el id `idl`)
  const tasksInCurrentList = allTasks.filter((task) => task.lista === idl);
    
  // Actualizar el estado `tasks` solo con las tareas de la lista actual
  setTasks(tasksInCurrentList);
  getTasks() 
};

  /* Actualiza valores */
  useEffect(() => {
    getTasks();
  }, [idl]);
  
  useEffect(() => {
    getTasks();
  }, [idc]); 
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

      <div ref={drop} className={`rounded ${darkMode ? 'bg-slate-500 text-slate-50' :'bg-grey-light'} flex-no-shrink w-64 p-2 mx-1 mb-8 max-h-screen my-2 overflow-y-scrool overflow-visible`} >

        <div className="flex justify-between pt-1">
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
          execOnClick={() => confirmDeleteL(idl)} // Pass the handleDeleteList function as a prop
          textDrop="Borrar lista"
       />
        </div>

        {tasks.map((task) => {
        if (task.lista === idl) {
          return (
            <Task
            className={`${darkMode?'text-gray-100 hover:text-slate-50':'text-black'}`}
              key={task.id}
              textoVar={task.Descripcion}
              idc={task.id}
              confirmDelete={() => confirmDelete(task.id)}
              background={task.prioridad ? "bg-red-400" : `${darkMode?'bg-gray-700 text-gray-400':'bg-white text-black'} hover:bg-gray-400/25`}
              border={`${darkMode?'border-b border-gray-500 cursor-pointer hover:bg-gray-600':'border-b border-grey cursor-pointer hover:bg-grey-lighter'}`}
            
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
            <p className={`mt-3 ${darkMode ? 'text-slate-50' :'text-grey-dark'} rounded-lg p-1 text-sm hover:bg-gray-600/50`}>+Añada una tarjeta...</p>
          </a>
        )}
      </div>
  );
}