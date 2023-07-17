import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { db } from '../assets/firebaseConfig/firebase';
import Header from './Header';
import TrelloK from './TrelloK';
import InputTablero from './atoms/InputTablero';
import { UserAuth } from '../context/AuthContext';
import List from './List';

export default function UserPanel() {
  const { userId } = UserAuth();
  const [tablero, setTablero] = useState([]);
  const [showTablero, setShowTablero] = useState(false);
  const [showInputTablero, setShowInputTablero] = useState(false);
  const [titleTablero, setTitleTablero] = useState('');
  const [selectedTablero, setSelectedTablero] = useState('');
  const tablerosRef = collection(db, 'Trello');

  const obtenerTableros = async () => {
    try {
      const querySnapshot = await getDocs(
        query(tablerosRef, where('user', '==', userId))
      );
      const datosTableros = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTablero(datosTableros);
      console.log(tablero)
    } catch (error) {
      console.log('No se puede cargar:', error);
    }
  };

  useEffect(() => {
    obtenerTableros();
  }, [userId]);

  const cancelTablero = () => {
    setShowInputTablero(false);
  };
  const hideTablero = () => {
    console.log("ejecutado")
    setShowInputTablero(true);
  };

  const handleShowTablero = (id) => {
    setShowTablero(true);
    setSelectedTablero(id)
    console.log("Tablero id: " + id)
  };

  const quitTablero = async (id) => {
    const tableroDoc = doc(db, 'Trello2', id);
    await deleteDoc(tableroDoc);
  };

  const addTablero = async (titleTablero) => {
    try {
      await addDoc(tablerosRef, {
          Titulo: titleTablero,
          user: userId
      });
      obtenerTableros();
    } catch (error) {
      console.error('Error al agregar el tablero:', error);
    }
  };


  const handleAddTablero = () => {
    addTablero(titleTablero);
    setTitleTablero('');
    setShowInputTablero(false);
  };

  return userId ? (
    <div className="bg-blue w-screen h-screen font-sans">
      <Header />
        <div className="md:inline-flex my-5">
        
      {tablero.map((tablerox) => (
      <div className="d-flex my-5 border-white" style={{marginTop:"5%"}}key={tablerox.id}>
        <Card className="d-flex mx-2 bg-blue-300/50 rounded-md px-10 py-3" >
          <Card.Header className="text-lg text-center text-white py-5">{tablerox.Titulo}</Card.Header>
          <Card.Body className="flex space-x-4 text-center">
            <Button
              className="text-white bg-blue-600/50 hover:opacity-75 rounded-md p-2 word-break"
              onClick={() => handleShowTablero(tablerox.id)}
            >
              Mostrar Tablero
            </Button>
            <Button 
            className="text-white bg-gray-600 bg-opacity-50 hover:opacity-75 text-gray-100/75 p-2 rounded-md word-break" 
            onClick={() => quitTablero(tablerox.id)}>
              Eliminar Tablero
            </Button>
          </Card.Body>
        </Card> 
        </div>
      ))}
     </div>
     <div className="d-block">
        {showInputTablero?(
          <InputTablero
            userId={userId}
            handleAddTablero={handleAddTablero}
            cancelTablero={cancelTablero}
            tableroId={tablero.id}
            setTitleTablero={setTitleTablero}
            titleTablero={titleTablero}
          />
        ):(
          <Button onClick={hideTablero} className="w-64 border-none rounded-2xl text-start ps-3 py-3 pe-8 pe-8 bg-blue-300/50 hover:opacity-75 text-white text-sm ml-2 px-10">
          {tablero.length<1?("+Añada un tablero..."):("+Añada otro tablero...")}
          </Button>
        )}
     </div>
     
      {showTablero?(tablero.length>0? (
        <List 
          tableroId={tablero.find((tablerox) => tablerox.id === selectedTablero).id}
        
        />
      ):(
      <h2>No hay tableros..</h2>
      )):(null)}
      
    </div>
  ) : (
    <h2>No hay usuarios..</h2>
  );
}

