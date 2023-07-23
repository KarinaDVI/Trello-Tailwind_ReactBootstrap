// InputTask.js
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export default function InputTablero({ tableroId, userId, titleTablero,
  setTitleTablero, handleAddTablero, cancelTablero, classVar}) {

 const inputRef2= useRef(null);

  const handleTextoChange = (e) => {
    setTitleTablero(e.target.value);
  };
  const handleInput = () =>{
    inputRef2.current.value='';
  }

  return (
    <div className="px-4 w-fit rounded-md">
    <Form className={`p-2 ${classVar} rounded-md rounded-md`} >
      <Form.Group className="mb-3" controlId="formControlTextarea">
        {/* Aqui tomo el texto del input */}
        <Form.Control className="rounded w-60 text-sm break-words" as="textarea" placeholder='Introduzca un titulo para este tablero' rows={2} ref={inputRef2} onChange={handleTextoChange}/>
      </Form.Group>
      <div className="inline-flex justify-content-between text-start w-100 align-items-center ">
          
          <Button variant="primary" type="button" className="object-left text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white px-2" onClick={() => { handleAddTablero(); handleInput(); }}>
            + Añadir un Tablero
          </Button>
          
          <Button variant="secondary" type="button" className="object-center bg-transparent px-2 text-2xl cursor-pointer alert-del text-gray-600/75 hover:text-gray-700/75" onClick={() => { cancelTablero(); }}>
            <h3 className="material-symbols-outlined text-bottom p-0 h-25">close</h3>
          </Button>
          
      </div>
    </Form>
    
    </div>
   
  );
}