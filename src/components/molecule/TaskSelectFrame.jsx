import React from 'react'
import TaskCheck from '../atoms/TaskCheck'
export default function TaskSelectFrame() {
  return (
    <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
        Check the responsive layout on all device<select className="custom-select">
        <option defaultValue>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        </select>
        
       <TaskCheck/>
	</div>
  )
}
