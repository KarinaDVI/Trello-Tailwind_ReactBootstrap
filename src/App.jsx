import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TrelloK from './components/TrelloK'
import Trello from './components/Trello'
function App() {
 
  return (
    <div>
      <BrowserRouter>
      <Routes>
     {/*  <List/> */}
     <Route path='/' element={<TrelloK/> }/>
     {/*  <Trello/> */}
     </Routes>
    </BrowserRouter>

    </div>
  )
}

export default App
