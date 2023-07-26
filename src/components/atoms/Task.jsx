import React, {useState} from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/DragandDropTypes";

export default function Task({  textoVar, 
                               idc, confirmDelete, 
                               background, border,
                               setUpdte
                            }) {


  // Definir la tarea que se arrastra
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK, // Especificar el tip de contenido que arrastra
    item: { idc, textoVar }, // Los datos que se pasan al arrastrar
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const handleOnDragStart=()=>{
    setUpdte(true)
  }
  
  return (
    <div className={`text-sm mt-2 `}>
      <div
          ref={drag}  draggable={true} onDragStart={handleOnDragStart}
          className={`flex justify-between ${background} p-2 rounded mt-1 ${border} ${isDragging ? 'dragging' : ''}`}
          key={idc}
      >
        <p className="break-all">{textoVar}</p>
        <a href="#" onClick={()=>{confirmDelete(idc)}}>X</a>
        
      </div>
    </div>
  );
}