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

  const toggleTheme = async () => {

    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (colorModeExists===false) { 
      addColorMode(newDarkMode);
    } else {
      updateColorMode(colorMode[0].id);
    }
    console.log("Dark mode está en: " + newDarkMode);
  };


  const getColorMode = async () => {
    try {
      const querySnapshot = await getDocs(
        query(colorRef, where('user', '==', userId))
      );

      const dataColors = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Get-ColorMode array ahora tiene: "+colorMode.length)
      if (dataColors.length > 0) {
        setColorMode(dataColors);
        console.log("Get-ColorMode array ahora tiene: "+colorMode.length)
        setColorModeExists(true);
      } else {
        setColorModeExists(false);
      }

      console.log(colorMode);
    } catch (error) {
      console.log('No se puede cargar:', error);
    }
  };

  const addColorMode = async (darkMode) => {
    console.log("En colorMode: "+colorMode)
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

  useEffect(() => {
    getColorMode();
  }, []);

 /*  useEffect(() => {
    console.log(colorMode);
  }, [colorMode]); */
  

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