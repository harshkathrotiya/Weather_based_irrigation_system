import logo from './logo.svg';
import './App.css';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
