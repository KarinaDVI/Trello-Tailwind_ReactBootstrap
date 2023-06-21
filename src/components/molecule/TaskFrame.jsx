// TaskFrame.js
import React from "react";
import Task from "../atoms/Task";

export default function TaskFrame({ drag, texto, idc, 
                                    quitTask, priority,
                                    background/* ,numero, setNumero */
                                 }) {
  return (
    
      <div className="text-sm mt-2" key={idc}>
        <Task drag={drag} 
              textoVar={texto} 
              idc={idc} 
              quitTask={quitTask}
              priority={priority}
              background={background}
              />

      </div>
  );
}