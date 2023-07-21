import React,{useState, useEffect} from 'react'
import Frame from './Frame';
import DragAndDrop from './utils/DragAndDrop';
import InputList from './atoms/InputList';

import { dbCollections} from "../assets/firebaseConfig/collections";

/* Firebase imports */
import {collection, getDocs, getDoc, deleteDoc, updateDoc, doc, query, where} from 'firebase/firestore';
import {addDoc} from 'firebase/firestore';
import { db } from "../assets/firebaseConfig/firebase";
import {async} from '@firebase/util';
import Swal from 'sweetalert2';
import { useDarkMode } from './utils/DarkModeContext';

export default function List({tableroId}) {
  const {darkMode} = useDarkMode();
  const [idl, setIdl] = useState(0);
  const [showList, setShowList] = useState(false);
  const [lists, setLists] = useState([]);
  const [titleList, setTitleList] = useState("");
  const [modify, setModify] = useState(false);
  const [valor, setValor]=useState('')
  const[mode, setMode]= useState('')

  const ListsCollection = collection(db, "Listas");

  const handleAddList = (idl) => {
    if(modify){
        confirmModifyL(idl)
        setModify(false)
    }else{
        addNewList(titleList)
    }

    setTitleList("");
    setShowList(false);
    
  };
  useEffect(() => {
    isDarkmode();
  }, [darkMode, mode]);
  
  const isDarkmode = async() => {
    await setMode(darkMode ? 'bg-slate-800' : 'bg-blue-300/50');
  };
  
  useEffect(() => {
    console.log("Mode está en:" + mode);
  }, [mode]);

  /* getList nueva */
  const getLists = async () => {
    if (tableroId) {
      /* const listasRef = collection(ListsCollection); */
      console.log("tableroId: "+tableroId)
      const q = query(ListsCollection, where("trello", "==", tableroId));
      const snapshot = await getDocs(q);
      const datosListas = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLists(datosListas);
      console.log(datosListas);
    }
  };

  /* AddList nueva */
  useEffect(() => {
    getLists();

  }, [tableroId]);


  const addNewList = async (titleList) => {
    await addDoc(ListsCollection, { Titulo: titleList, trello: tableroId });
    getLists();
    console.log("Lista del trello: "+tableroId)
  };
  /*  */

  const hideList = () => {
    console.log("ejecutado");
    setShowList(true);
  };

  const cancelList = () => {
    setShowList(false);
    setModify(false);
  };

  //Borrar la lista y todas sus tareas asociadas
  const quitList = async (id) => {
    const listDocRef = doc(db, "Listas", id);
    const tasksCollectionRef = collection(db, "Tareas");

    // Obtener todas las tareas asociadas a la lista
    const querySnapshot = await getDocs(
      query(tasksCollectionRef, where("lista", "==", id))
    );

    // Borrar cada tarea individualmente
    const deleteTasks = querySnapshot.docs.map(async (taskDoc) => {
      await deleteDoc(taskDoc.ref);
      console.log(`Borrada tarea ${taskDoc.id}`);
    });

    // Esperar a que se borren todas las tareas
    await Promise.all(deleteTasks);

    // Borrar el documento de la lista
    await deleteDoc(listDocRef);

    getLists();
  };


  /* Modificar*/
const alertaGuardado = ()=>{
  Swal.fire({
  title: 'Registro modificado y guardado',
  showClass: {
      popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
  }
  });
}

const noEncontrado = ()=>{
  Swal.fire({
  title: 'Lista no encontrada',
  showClass: {
      popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
  }
  });
}


const update = async (id)=>{
  const list = doc(db, dbCollections.Listas, id);
  const listSnapshot = await getDoc(list);
  if(listSnapshot.exists()){
  const data = listSnapshot.data();
    data.Titulo = valor;
  await updateDoc(list, data);
  alertaGuardado();
  console.log("modificado!" + id);
  getLists();
  }else{
    noEncontrado();
  }
};


  /* Confirmar borrado de lista*/
  const confirmDeleteL = (id) => {
    Swal.fire({
      title: "Deseas eliminar?",
      text: "Presione cancel para evitar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        quitList(id); // Call the quitList function to delete the list with the provided id
        Swal.fire("Borrado!", "Se borró la lista.", "success");
      }
    });
  };

  /* Confirmar modificar listas */
  const confirmModifyL = (idl) => {
    Swal.fire({
      title: "Deseas Modificar la lista?",
      text: "Presiona cancel para evitarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, modificalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        update(idl); // Call the quitList function to modify the list with the provided id
        Swal.fire("Modificado!", "Se modificó la lista.", "success");
      }
    });
  };

  /*  */

  return (
    <div className={`md:inline-flex ${mode} rounded-md mx-2 px-4 pb-8 pt-8 items-start mt-[25px]`}>
      
      {lists.map((list) => (
        <Frame
          key={list.id}
          titleList={list.Titulo}
          idl={list.id}
          drag={DragAndDrop.drag}
          confirmDeleteL={() => confirmDeleteL(list.id)}
          confirmModifyL={() => confirmModifyL(list.id)}
          setIdl={setIdl}
          handleAddList={handleAddList}
          setTitleList={setTitleList}
          cancelList={cancelList}
          modify={modify}
          setModify={setModify}
          valor={valor}
          setValor={setValor}
          
        />
      ))}

      {showList ? (
        <InputList
          idl={idl}
          setIdl={setIdl}
          handleAddList={handleAddList}
          titleList={titleList}
          setTitleList={setTitleList}
          cancelList={cancelList}

        />
      ) : (
        <div className="d-block w-25">
          <button
            type="button"
            className="w-64 border-none rounded-2xl text-start ps-3 py-3 pe-8 pe-8 bg-gray-600 bg-opacity-50 hover:opacity-75 text-gray-100/75 text-sm "
            onClick={hideList}
          >
            {lists.length < 1 ? "+Añada una lista..." : "+Añada otra lista..."}
          </button>
        </div>
      )}
    </div>
  );
}