// InputTask.js
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Task from '../atoms/Task';
import CloseButton from 'react-bootstrap/CloseButton';

import DragAndDrop from '../utils/DragAndDrop';


export default function InputTask({ idc, setIdc, addCard, textoVar,
  setTextoVar,handleAddCard, cancelTask, setPriority}) {

 const [isChecked, setIsChecked] = useState(false);
 const inputRef= useRef(null);

  const handleTextoChange = (e) => {
    setTextoVar(e.target.value);
  };
  const handleInput = () =>{
    inputRef.current.value='';
  }

  const getChecked=()=>{
    isChecked?setPriority(true):setPriority(false)
  }
 

  return (
    <div className="pt-2 w-100">
    <Form>
      <Form.Group className="mb-3" controlId="formControlTextarea">
        {/* Aqui tomo el texto del input */}
        <Form.Control className="rounded w-60 text-sm text-gray-600 break-words" as="textarea" placeholder='Introduzca un titulo para esta tarjeta' rows={2} ref={inputRef} onChange={handleTextoChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check className="text-sm ml-2" type="checkbox" label=" Prioritario" checked={isChecked} onChange={(e) => {e.preventDefault, setIsChecked(e.target.checked),setPriority(e.target.checked)}}/>
      </Form.Group>
      <div className="inline-flex justify-content-between text-start w-100 align-items-center ">
          
          <Button variant="primary" type="button" className="object-left text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white px-2" onClick={() => { getChecked(); handleAddCard(); handleInput(); }}>
            + Añadir una tarjeta
          </Button>
          
          <Button variant="secondary" type="button" className="object-center bg-transparent px-2 text-2xl cursor-pointer alert-del text-gray-600/75 hover:text-gray-700/75" onClick={() => { cancelTask(); }}>
            <h3 className="material-symbols-outlined text-bottom p-0 h-25">close</h3>
          </Button>
          
      </div>
    </Form>
    
    </div>
   
  );
}