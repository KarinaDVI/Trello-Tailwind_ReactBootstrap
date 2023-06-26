import React,{useState, useEffect} from 'react'
import Frame from './Frame';
import DragAndDrop from './utils/DragAndDrop';
import InputList from './atoms/InputList';


/* Firebase imports */
import {Link} from 'react-router-dom';
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore';
import {addDoc} from 'firebase/firestore';
import { db } from "../assets/firebaseConfig/firebase";
import {async} from '@firebase/util';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function List() {

    const [idl, setIdl] = useState(0);
    const [showList, setShowList] = useState(false);
    const [lists, setLists] = useState([]);
    const [titleList, setTitleList] = useState('');

    const ListsCollection = collection(db, "Listas");


    const handleAddList = () => {
        addNewList(titleList);
        setTitleList('');
        setShowList(false);
      };

   
    /* Mostrar firebase */
        const getLists = async () => {
            
          const data = await getDocs(ListsCollection);
          //console.log(data.docs);
          setLists(
              data.docs.map((docl)=>({...docl.data(), id:docl.id}))
              //console.log(Tasks);
    
          )
      }
        useEffect(()=>{
          getLists();
      }, [])
    /*  */
     
      const addNewList = async (titleList)=>{
       /*  setIdl(idl + 1);
        const newList = {
          idl: idl,
          title: titleList,
        };
        setLists([...lists, newList]); */
        
        /* Firebase */
        await addDoc(ListsCollection, {Titulo: titleList});
        /* alertaCreacionLista(); */
        getLists();
        /*  */

      }

      const hideList = () => {
        console.log("ejecutado")
        setShowList(true);
      };

      const cancelList = () => {
        setShowList(false);
      };
    

  return (
    <div className="inline-flex bg-blue px-4 pb-8 pt-8 items-start mt-[200px]">
      
        {lists.map((list) => (
                <Frame
                    key={list.id} 
                    titleList={list.Titulo}
                    idl={list.id}
                    drag={DragAndDrop.drag}
                />
                ))}
          
          {showList ? (
            <InputList 
                idl={idl}
                setIdl={setIdl}
                handleAddList={handleAddList}
                titleList={titleList}
                setTitleList={setTitleList}
                cancelList={cancelList}/>
                    ):
                    (
                      <div className="d-block w-25">
                        <button type="button" 
                        className="w-64 border-none rounded-2xl text-start ps-3 py-3 pe-8 pe-8 bg-gray-600 bg-opacity-50 hover:opacity-75 text-gray-100/75 text-sm ml-2" 
                        onClick={hideList}>{lists.length<1?("+Añada una lista..."):("+Añada otra lista...")}</button>
                
                      </div>
                    
                    )}
            
    
    </div>
  )
}
