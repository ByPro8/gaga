import './App.css';
import { Routes, Route } from "react-router-dom";
import Slideshow from './pages/Slideshow';
import Contact from './pages/Contact';
import About from './pages/About';
import Photography from './pages/Photography';
import Videography from './pages/Videography';
import Projects from './pages/Projects';
import Home from './pages/Home';

function App() {
  return (
    <div className='h-screen w-full flex pt-10 font-fira '>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/slideshow" element={<Slideshow />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/videography" element={<Videography />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
