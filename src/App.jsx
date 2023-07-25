import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeLogin from './components/HomeLogin';
import List from './components/List';
import Register from './components/Register';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import UserPanel from './components/UserPanel';
import { DarkModeProvider } from './components/utils/DarkModeContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
 
  return (
    <div>
      <BrowserRouter>
      <AuthContextProvider>
   <DarkModeProvider>
    <DndProvider backend = {HTML5Backend}>
        <Routes>
         <Route path='/' element={<HomeLogin/> }/>
         <Route path='/home/:userId' element={
         <ProtectedRoute>
          <UserPanel />
         </ProtectedRoute>}/>
         <Route path="/list/:tableroId" element={
         <ProtectedRoute><List />
         </ProtectedRoute>} />
          <Route path='/register' element={<Register/> }/>
      </Routes>
      </DndProvider>
      </DarkModeProvider>
      </AuthContextProvider>
    </BrowserRouter>

    </div>
  )
}

export default App

/* Cosas que faltan hacer: 
  -Implementar drag and drop de tareas.
  -Borrado de Tableros: Utilizar una función 
  que borre el tablero y llame al borrado en cascada 
  de listas para borrar las tareas .. COpiado borrado de
  listas en UserPanel para ver el borrado  
  */