import React,{useState} from 'react'
import Frame from './Frame';
import DragAndDrop from './utils/DragAndDrop';
import InputList from './atoms/InputList';

export default function List() {

    const [idl, setIdl] = useState(0);
    const [showList, setShowList] = useState(false);
    const [lists, setLists] = useState([]);
    const [titleList, setTitleList] = useState('');


    const handleAddList = () => {
        addNewList(titleList);
        setTitleList('');
        setShowList(false);
      };
    
      const addNewList =(titleList)=>{
        setIdl(idl + 1);
        const newList = {
          idl: idl,
          title: titleList,
        };
        setLists([...lists, newList]);
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
                    key={list.idl} 
                    titleList={list.title}
                    idl={list.idl}
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
