import React from 'react'
import List from './List'
import Header from './Header'

export default function TrelloK({tableroId}) {

  return (
    <>
        <Header />
         {/*  {emailId && <List id={emailId} />} {// Render the List component with the emailId as the ID  */}
        <List tableroId={tableroId}/>
       <h2>Este es el tablero:{tableroId}</h2>
      
    </>
  )
}
