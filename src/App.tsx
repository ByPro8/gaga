import "./App.css";
import { Routes, Route } from "react-router-dom";
import Slideshow from "./pages/Slideshow";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Photography from "./pages/Photography";
import Videography from "./pages/Videography";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import Album from "./pages/Album";
import FromAlbumSlides from "./pages/FromAlbumSlides";

function App() {
  return (
    <>
      <div className="flex h-screen w-full font-fira">
        <Routes>
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
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
