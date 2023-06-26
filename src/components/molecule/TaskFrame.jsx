// TaskFrame.js
import React from "react";
import Task from "../atoms/Task";

export default function TaskFrame({ drag, texto, idc, 
                                    confirmDelete, priority,
                                    background/* ,numero, setNumero */
                                 }) {
  return (
    
      <div className="text-sm mt-2" key={idc}>
        <Task drag={drag} 
              textoVar={texto} 
              idc={idc}
              confirmDelete={confirmDelete}
              priority={() => confirmDelete(idc)}
              background={background}
              />

      </div>
  );
}