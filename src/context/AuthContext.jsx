import { useContext,createContext } from "react";
import {createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        signOut, sendPasswordResetEmail,
        onAuthStateChanged} from  'firebase/auth'
import { auth } from "../assets/firebaseConfig/firebase";
import { useEffect, useState } from "react";

const UserContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Guardar el userId en el almacenamiento local
            localStorage.setItem('userId', userCredential.user.uid);
            return userCredential;
          });
    };

    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Guardar el userId en el almacenamiento local
            localStorage.setItem('userId', userCredential.user.uid);
            return userCredential;
          });
    };

    const logout = ()=>{
        // Eliminar el userId del almacenamiento local al cerrar la sesión
        localStorage.removeItem('userId');
        return signOut(auth)
    }

   /*   useEffect(() =>{
        const unsuscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log(currentUser);
            setUser(currentUser);
        })
        return ()=>{
            unsuscribe();
        }
    }, []);  */

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
            setUserId(currentUser.uid); // Guardar el ID del usuario
          } else {
            setUser({});
            setUserId(null); // Establecer el ID del usuario como nulo
          }
        });
      
        return () => {
          unsubscribe();
        };
      }, []);

      const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
      };

    return(
   <UserContext.Provider value ={{createUser, user, userId, logout, signIn, forgotPassword}}>
    {children}
    </UserContext.Provider>
    );
}

export const UserAuth = ()=>{
    return useContext(UserContext)
}