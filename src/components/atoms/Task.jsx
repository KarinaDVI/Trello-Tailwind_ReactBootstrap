import React, {useState} from "react";

export default function Task({ drag, textoVar, idc, quitTask, background}) {


  const handleClick =()=>{
    quitTask(idc);
  }
  
  return (
    
    <div
         className={`flex justify-between ${background} p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter`}
         draggable={true} key={idc}
    >
      <p>{textoVar}</p>
      <a href="#" onClick={handleClick}>X</a>
      
    </div>
  );
}
