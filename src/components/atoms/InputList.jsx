// InputTask.js
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Task from '../atoms/Task';
import DragAndDrop from '../utils/DragAndDrop';

export default function InputList({ idl, setIdl, titleList,
                                    setTitleList,handleAddList, 
                                    cancelList
                                     }) {

 const inputlRef= useRef(null);

  const handleTitleChange = (e) => {
      setTitleList(e.target.value)
  };

  const handleInput = (val) =>{
    inputlRef.current.value='';
  }

  return (
    <div className={`rounded bg-grey-light text-gray-500 flex w-64 p-2 h-auto  mr-3`}>
    <Form>
      <Form.Group className="mb-3" controlId="formControlTextarea">
        {/* Aqui tomo el texto del input */}
        <Form.Control className="rounded text-sm text-gray-600 w-60 p-2" as="textarea" placeholder='Introduzca el titulo de la lista..' rows={2} ref={inputlRef} onChange={handleTitleChange}/>
      </Form.Group>
      <div className="inline-flex justify-content-between text-start w-100 align-items-center ">
          
          <Button variant="primary" type="button" className="object-left text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white px-2" onClick={()=>{handleAddList(idl)}}>
            +Añadir lista
          </Button>
          
          <Button variant="secondary" type="button" className="object-center bg-transparent px-2 text-2xl cursor-pointer alert-del text-gray-600/75 hover:text-gray-700/75" onClick={()=>{cancelList()}}>
            <h3 className="material-symbols-outlined text-bottom p-0 h-25">close</h3>
          </Button>
          
      </div>
    </Form>
    
    </div>
   
  );
}