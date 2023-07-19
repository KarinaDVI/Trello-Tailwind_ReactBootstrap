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
        <Form.Control className="rounded text-sm w-52 py-1 px-2" /* as="textarea" */ placeholder='Introduzca el titulo de la lista..' rows="1" ref={inputlmRef} onChange={handleTitleChange} onBlur={handleBlur} defaultValue={titleList}/>
      </Form.Group>
      {/* <div className="inline-flex justify-content-between text-start w-100 align-items-center ">
          
          <Button variant="primary" type="button" className="object-left text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white px-2" onClick={()=>{handleAddList(idl)}}>
            Modificar Lista
          </Button> */}
          
          {/* <Button variant="secondary" type="button" className="object-center bg-transparent px-2 text-2xl cursor-pointer alert-del text-gray-600/75 hover:text-gray-700/75" onClick={()=>{cancelList()}}>
            <h3 className="material-symbols-outlined text-bottom p-0 h-25">close</h3>
          </Button> 
          
      </div>*/}
    </Form>
    
    </div>
   
  );
}