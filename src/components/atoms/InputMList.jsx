// InputTask.js
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TaskFrame from '../molecule/TaskFrame';
import DragAndDrop from '../utils/DragAndDrop';

export default function InputMList({ idl, setIdl, titleList,
                                    setTitleList,handleAddList, 
                                    cancelList, modify, valor, setValor, 
                                    setModify }) {

 const inputlmRef= useRef(null);
 const [val, setVal]=useState(valor)

  const handleTitleChange = (e) => {

    if(modify){
      setVal(titleList)
      setTitleList(e.target.value)
      setValor(e.target.value)
    }else{
       setTitleList(e.target.value)
    }
  };

  const handleBlur = () => {
    setVal(inputlmRef.current.value);
    handleAddList(idl)
  };
 
  return (
    <div className={`rounded bg-grey-light flex w-32  mr-3`}>
    <Form>
      <Form.Group className="m-0" controlId="formControlTextarea">
        {/* Aqui tomo el texto del input */}
        <Form.Control className="rounded text-sm text-gray-600 w-52 py-1 px-2" /* as="textarea" */ placeholder='Introduzca el titulo de la lista..' rows="1" ref={inputlmRef} onChange={handleTitleChange} onBlur={handleBlur} defaultValue={titleList}/>
      </Form.Group>
    </Form>
    
    </div>
   
  );
}