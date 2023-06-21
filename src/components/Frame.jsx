import React, { useState } from "react";
import "./Frame.css";
import TaskFrame from "./molecule/TaskFrame";
import DragAndDrop from "./utils/DragAndDrop";
import InputTask from "./atoms/InputTask";

export default function Frame({titleList}) {
  const [idc, setIdc] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [textoVar, setTextoVar] = useState('');
  const [priority, setPriority] = useState(false);
  const [background, setBackground] = useState("bg-white");
  /* const [numero, setNumero] = useState(0); */

  const newTask = () => {
    setShowInput(true);
  };
  const cancelTask =()=>{
    setShowInput(false);
  }
 const quitTask =(numero)=>{
  tasks.forEach((task)=>console.log(task.id,task.texto))
  setTasks(tasks.filter((task)=>task.id!=numero))
 }

  const addCard = (textoVar) => {
    setIdc(idc + 1);
  
    const newTask = {
      id: idc,
      texto: textoVar,
      priority: priority,
    };
    setTasks([...tasks, newTask]);
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

        {tasks.map((task) => (
          <TaskFrame
              key={task.id}
              texto={task.texto}
              idc={task.id}
              drag={DragAndDrop.drag}
              quitTask={quitTask}
              background={task.priority?"bg-red-400":"bg-white"}
          />
        ))}
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
