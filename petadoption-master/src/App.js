import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Main from './pages/Main';
import Fav from './pages/Fav';
import Donate from './pages/Donate';import './App.css';
import DonatedList from './pages/DonatedList';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register={"register"}/>}/>
        <Route path='/fav' element={<Fav/>}/>
        <Route path='/donate' element={<Donate/>}/>
        <Route path='/donated' element={<DonatedList/>}/>
      </Routes>
    </div>
  );
}

export default App;
