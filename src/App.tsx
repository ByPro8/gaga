import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";

import Slideshow from "./pages/Slideshow";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Photography from "./pages/Photography";
import Videography from "./pages/Videography";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import Album from "./pages/Album";
import FromAlbumSlides from "./pages/FromAlbumSlides";
import VimeoPlayer from "./pages/VimeoPlayer";
import TestVideoP from "./pages/TestVideoP";

function App() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-full font-custom">
      {/* <AnimatePresence mode="wait"> */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/slideshow" element={<Slideshow />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/photography/:albumId" element={<Album />} />
        <Route
          path="/photography/:albumId/:photoId"
          element={<FromAlbumSlides />}
        />
        <Route path="/videography" element={<Videography />} />
        <Route path="/videography/:vimeoId" element={<TestVideoP />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {/* </AnimatePresence> */}
    </div>
  );
}

export default App;
