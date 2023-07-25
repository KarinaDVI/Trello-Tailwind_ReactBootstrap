import React, {useState} from "react";

export default function Task({ drag, textoVar, 
                               idc, confirmDelete, 
                               background, border
                            }) {


  /* const handleClick =()=>{
    confirmDelete(idc);
  } */
  
  return (
    <div className="text-sm mt-2" key={idc}>
      <div
          className={`flex justify-between ${background} p-2 rounded mt-1 ${border}`}
          draggable={true} key={idc}
      >
        <p className="break-all">{textoVar}</p>
        <a href="#" onClick={()=>{confirmDelete(idc)}}>X</a>
        
      </div>
    </div>
  );
}
