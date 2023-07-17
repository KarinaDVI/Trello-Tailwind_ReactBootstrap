import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TrelloK from './components/TrelloK'
import Trello from './components/Trello'
import HomeLogin from './components/HomeLogin';
import Register from './components/Register';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import UserPanel from './components/UserPanel';
function App() {
 
  return (
    <div>
      <BrowserRouter>
      <AuthContextProvider>
        <Routes>
         <Route path='/' element={<HomeLogin/> }/>
         <Route path='/home/:userId' element={
         <ProtectedRoute>
          <UserPanel />
         </ProtectedRoute>}/>
          <Route path='/register' element={<Register/> }/>
      </Routes>
      </AuthContextProvider>
    </BrowserRouter>

    </div>
  )
}

export default App

/* Cosas que faltan hacer: 
  -Implementar drag and drop de tareas.
  
  */