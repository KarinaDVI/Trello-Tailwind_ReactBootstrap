import React from 'react'
import TaskFrame from './../molecule/TaskFrame';
import InputTask from '../atoms/InputTask';

export default function NewTask(
    {
  setIdc,
  idc,
  drag,
  text,
  setItems,
  items,
  setTextoVar,
  h5Ref
}
) {

    const putText = () => {
        setIdc(idc + 1);
        return(
        <InputTask
            
        />
            
        )
    }
   
}
