import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { db } from '../assets/firebaseConfig/firebase';
import Header from './Header';
import InputTablero from './atoms/InputTablero';
import { UserAuth } from '../context/AuthContext';
import List from './List';
import { useDarkMode } from './utils/DarkModeContext';
import Swal from 'sweetalert2';

export default function UserPanel() {
  const { userId } = UserAuth();
  const {darkMode}=useDarkMode();
  const [tablero, setTablero] = useState([]);
  const [showTablero, setShowTablero] = useState(false);
  const [showInputTablero, setShowInputTablero] = useState(false);
  const [titleTablero, setTitleTablero] = useState('');
  const [selectedTablero, setSelectedTablero] = useState('');
  const tablerosRef = collection(db, 'Trello');
  const darkColors= darkMode?'bg-blue-700/25 text-gray-100':'bg-blue-300/50 text-gray-100'

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
    } catch (error) {
      !userId?null:
      errorOpTablero('No se puede cargar el tablero', 'Si está seguro que existe intente nuevamente')
    }
  };

  useEffect(() => {
    obtenerTableros();
  }, [userId, showTablero]);

  const cancelTablero = () => {
    setShowInputTablero(false);
  };
  const hideTablero = () => {
    setShowInputTablero(true);
  };

  const handleShowTablero = (id) => {
    setShowTablero(true);
    setSelectedTablero(id)
    /* console.log("Tablero id: " + id) */
  };

 /*  const quitTablero = async (id) => {
    const tableroDoc = doc(db, 'Trello2', id);
    await deleteDoc(tableroDoc);
  }; */

  const errorOpTablero = (titlep, textp) =>{
    Swal.fire({
      icon: 'error',
      title: titlep,
      text: textp
    })
  }

  const addTablero = async (titleTablero) => {
    try {
      await addDoc(tablerosRef, {
          Titulo: titleTablero,
          user: userId
      });
      obtenerTableros();
    } catch (error) {

      errorOpTablero('No se pudo crear el tablero','Intente dentro de un rato');
    }
  };

  const handleAddTablero = () => {
    addTablero(titleTablero);
    setTitleTablero('');
    setShowInputTablero(false);
  };

  /* Para borrar el tablero: */

  //Borrar la lista y todas sus tareas asociadas
  const quitList = async (id) => {
    try {
      const listDocRef = doc(db, "Listas", id);
      const tasksCollectionRef = collection(db, "Tareas");
      const querySnapshot = await getDocs(query(tasksCollectionRef, where("lista", "==", id)));
  
      const deleteTasks = querySnapshot.docs.map(async (taskDoc) => {
        await deleteDoc(taskDoc.ref);
      });
  
      await Promise.all(deleteTasks);
      await deleteDoc(listDocRef);
      // Optionally, you can call getLists() here to update the UI after deletion.
      // getLists();
    } catch (error) {
      // Handle any potential errors here
      console.error("Error while deleting the list and tasks:", error);
    }
  };

  const quitTablero = async (tabId) => {

    const trelloDocRef = doc(db, "Trello", tabId);
    const listsCollectionRef = collection(db, "Listas");
    const querySnapshot = await getDocs(
      query(listsCollectionRef, where("trello", "==", tabId))
    );
    const deleteLists = querySnapshot.docs.map(async (listDoc) => {
      await quitList(listDoc.id);
    });
    await Promise.all(deleteLists)
    .then(deleteDoc(trelloDocRef))
    .then(obtenerTableros())

    .then(setSelectedTablero(''))
    .then(setShowTablero(false));
    
  };
  /*  */

  return userId ? (
    <div onClick={obtenerTableros} className={`${darkMode ? 'bg-gray-900 w-screen h-screen font-sans' : 'bg-blue w-screen h-screen font-sans'}`}>
      <Header />
        <div className="md:inline-flex my-5 mx-4">
        
      {tablero.map((tablerox) => (
      <div className="d-flex my-5 border-white" style={{marginTop:"5%"}}key={tablerox.id}>
        <Card className={`d-flex mx-2 ${darkColors} rounded-md px-10 py-3`} >
          <Card.Header className="text-lg text-center text-gray-100 py-5">{tablerox.Titulo}</Card.Header>
          <Card.Body className="flex space-x-4 text-center justify-center">
            <Button
              className="text-gray-100 bg-blue-600/50 hover:opacity-75 rounded-md p-2 word-break"
              onClick={() => handleShowTablero(tablerox.id)}
            >
              Mostrar Tablero
            </Button>
            <Button 
            className="text-gray-100 bg-gray-600 bg-opacity-50 hover:opacity-75 text-gray-100/75 p-2 rounded-md word-break" 
            onClick={() => quitTablero(tablerox.id)}>
              Eliminar Tablero
            </Button>
          </Card.Body>
        </Card> 
        </div>
      ))}
      
     </div>
     <div className="d-block pb-8 mx-4">
        {showInputTablero?(
          <InputTablero

            userId={userId}
            handleAddTablero={handleAddTablero}
            cancelTablero={cancelTablero}
            tableroId={tablero.id}
            setTitleTablero={setTitleTablero}
            titleTablero={titleTablero}
            classVar={darkColors}
          />
        ):(
          <Button onClick={hideTablero} className={`w-64 border-none rounded-2xl text-start ps-3 py-3 pe-8 pe-8 ${darkMode?'bg-blue-400/25 text-gray-100':'bg-blue-300/50 text-white'} hover:opacity-75  text-sm ml-2 px-10`}>
          {tablero.length<1?("+Añada un tablero..."):("+Añada otro tablero...")}
          </Button>
        )}
     </div>
     <div className={`container-fluid ${darkColors}`}>
      {showTablero && tablero.length>0? (
        selectedTablero!==''?
        <List 
          tableroId={tablero.find((tablerox) => tablerox.id === selectedTablero)?.id}
          
        />
        :<h4>Elija tablero</h4>
      ):(
      null
      )}
      </div>
    </div>
  ) : (
    <h2>No hay usuarios..</h2>
  );
}

