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

  const [darkMode, setDarkMode] = useState(null);
  const [colorMode, setColorMode] = useState([]);
  const [idColor, setIdColor] =useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getColorMode();
  }, [userId]);

  useEffect(() => {
    console.log('colorMode actualizado:', colorMode);
 
    if (colorMode.length > 0) {
      setDarkMode(colorMode[0].color);
    }
    setLoading(false); // Finalizar la carga
  }, [colorMode]);

  const toggleTheme = async () => {
    // Actualizar el estado del modo oscuro de manera síncrona
    setDarkMode(darkMode);
    if (colorMode.length === 0) {
      addColorMode(darkMode);
    }
    if (colorMode.length === 1) {
      await updateColorMode(idColor);
    }
    console.log("Dark mode está en: " + darkMode);
  };

  const getColorMode = async () => {
    try {
      console.log("userId: ", userId)
     
      const q = query(colorRef, where("user", "==", userId));
      const snapshot = await getDocs(q);
      const dataColors = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      /*  */
      setColorMode(dataColors);
      setIdColor(dataColors[0].id)
      console.log('getColorMode: colorMode ',colorMode ,'dataColors ',dataColors);
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
      data.color = !darkMode;
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