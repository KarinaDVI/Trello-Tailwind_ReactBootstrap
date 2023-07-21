import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { collection, getDocs, updateDoc, getDoc, doc,addDoc, query, where, and } from 'firebase/firestore';
import { db } from '../../assets/firebaseConfig/firebase';
import { dbCollections } from '../../assets/firebaseConfig/collections';
import Swal from 'sweetalert2';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export const DarkModeProvider = ({ children }) => {
  const { userId } = UserAuth();
  const colorRef = collection(db, 'ColorMode');

  const [darkMode, setDarkMode] = useState();
  const [colorMode, setColorMode] = useState([]);
  const [colorModeExists, setColorModeExists] = useState(false);
  const [idColor, setIdColor] =useState('');

  useEffect(() => {
    getColorMode();
  }, []);


  const toggleTheme = async () => {

    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    getColorMode()
    if (colorMode.length==0) { 
      addColorMode(newDarkMode);
    } 
    if(colorMode.length==1) {
      updateColorMode(colorMode[0].id);
    }
    
    console.log("Dark mode está en: " + newDarkMode);
  };


  const getColorMode = async () => {
    try {
      console.log(userId)
      const querySnapshot = await getDocs(
        query(colorRef, where('user', '==', userId))
      );
      const dataColors = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setColorMode(dataColors);
      setIdColor(dataColors[0].id)

      console.log('colorMode ',colorMode ,'dataColors ',dataColors);
    } catch (error) {
      console.log('No se puede cargar:', error);
    }
  };

  const addColorMode = async (darkMode) => {
    console.log('En addColorMode: ',colorMode)
    try {
      await addDoc(colorRef, {
        color: darkMode,
        user: userId
      });
      getColorMode();
    } catch (error) {
      console.error('Error al agregar el modo de color:', error);
    }
  };

  const updateColorMode = async (id) => {
    const colorList = doc(db, dbCollections.ColorMode, id);
    const listSnapshot = await getDoc(colorList);
    if (listSnapshot.exists()) {
      const data = listSnapshot.data();
      data.color = darkMode;
      await updateDoc(colorList, data);
      console.log("modificado!" + id);
      getColorMode();
    } else {
      noEncontrado();
    }
  };

 
  

  const noEncontrado = () => {
    Swal.fire({
      title: 'Modo de color no encontrada',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};