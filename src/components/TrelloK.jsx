import React from 'react'
import List from './List'
import Header from './Header'

export default function TrelloK({tableroId}) {

  return (
    <>
        <Header />
        <List tableroId={tableroId}/>
       <h2>Este es el tablero:{tableroId}</h2>
      
    </>
  )
}
