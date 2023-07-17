import React,{useState, useEffect} from 'react'
import Frame from './Frame';
import DragAndDrop from './utils/DragAndDrop';
import InputList from './atoms/InputList';

/* Firebase imports */
import {collection, getDocs, deleteDoc, doc, query, where} from 'firebase/firestore';
import {addDoc} from 'firebase/firestore';
import { db } from "../assets/firebaseConfig/firebase";
import {async} from '@firebase/util';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function List({tableroId}) {
  const [idl, setIdl] = useState(0);
  const [showList, setShowList] = useState(false);
  const [lists, setLists] = useState([]);
  const [titleList, setTitleList] = useState("");

  const ListsCollection = collection(db, "Listas");

  const handleAddList = () => {
    addNewList(titleList);
    setTitleList("");
    setShowList(false);
  };

  /* Mostrar firebase */
  /*         const getLists = async () => {
        const data = await getDocs(ListsCollection);

        setLists(
        data.docs.map((docl)=>({...docl.data(), id:docl.id}))
        )
      } */

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
  /*  */
 /*  const getLists = async () => {
    const data = await getDocs(ListsCollection);

    setLists(
    data.docs.map((docl)=>({...docl.data(), id:docl.id}))
    )
  }
    useEffect(()=>{
      getLists();
  }, []) */
  /*  */

  /*   useEffect(()=>{
          getLists();
      }, []) */

  /*   const addNewList = async (titleList)=>{
        // Firebase 
        await addDoc(ListsCollection, {Titulo: titleList});
        // alertaCreacionLista(); 
        getLists();
      }  */

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
  };

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

    // Actualizar la vista de listas
    getLists();
  };

  const modifyList = async (id) => {
    console.log("modificado!" + id);
  };
  /* Firebase */
  const confirmDeleteL = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        quitList(id); // Call the quitList function to delete the list with the provided id
        Swal.fire("Deleted!", "List has been deleted.", "success");
      }
    });
  };
  const confirmModifyL = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, modify it!",
    }).then((result) => {
      if (result.isConfirmed) {
        modifyList(id); // Call the quitList function to delete the list with the provided id
        Swal.fire("Modified!", "List has been modified.", "success");
      }
    });
  };
  /*  */

  return (
    <div className="md:inline-flex bg-blue-300/50 rounded-md mx-2 px-4 pb-8 pt-8 items-start mt-[25px]">
      {lists.map((list) => (
        <Frame
          key={list.id}
          titleList={list.Titulo}
          idl={list.id}
          drag={DragAndDrop.drag}
          confirmDeleteL={() => confirmDeleteL(list.id)}
          confirmModifyL={() => confirmModifyL(list.id)}
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