import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeLogin from './components/HomeLogin';
import List from './components/List';
import Register from './components/Register';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import UserPanel from './components/userPanel';
import { DarkModeProvider } from './components/utils/DarkModeContext';
function App() {
 
  return (
    <div>
      <BrowserRouter>
      <AuthContextProvider>
   <DarkModeProvider> 
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
      </DarkModeProvider>
      </AuthContextProvider>
    </BrowserRouter>

    </div>
  )
}

export default App

/* Cosas que faltan hacer: 
  -Implementar drag and drop de tareas.
  -Declarar variables de estado [modif, setModif]=useState(false)
    para el metodo de modificar y crear.
  -Pasarle por props el estado a frame y que opere con ternario sobre el 
    h3 con el titulo y el input.
  */