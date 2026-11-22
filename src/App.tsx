import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { SiteSettingsProvider } from "./context/SiteSettingsContext";

import Slideshow from "./pages/Slideshow";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Photography from "./pages/Photography";
import Videography from "./pages/Videography";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import Album from "./pages/Album";
import FromAlbumSlides from "./pages/FromAlbumSlides";
import VideoPage from "./pages/VideoPage";

function App() {
  const location = useLocation();

  return (
    <SiteSettingsProvider>
      <div className="min-h-[100dvh] w-full bg-white font-custom text-gray-500">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/slideshow" element={<Slideshow />} />
          <Route path="/projects" element={<Projects />} />

          {/* Photography (Photo Albums) */}
          <Route path="/photography" element={<Photography />} />
          <Route path="/photography/:albumId" element={<Album />} />
          <Route
            path="/photography/:albumId/:photoId"
            element={<FromAlbumSlides />}
          />

          {/* Photo Stories (reuses the exact same gallery pages) */}
          <Route
            path="/photo-stories"
            element={
              <Photography
                galleryType="photoStory"
                basePath="/photo-stories"
                pageTitle="Photo Stories"
              />
            }
          />
          <Route
            path="/photo-stories/:albumId"
            element={
              <Album galleryType="photoStory" basePath="/photo-stories" />
            }
          />
          <Route
            path="/photo-stories/:albumId/:photoId"
            element={
              <FromAlbumSlides
                galleryType="photoStory"
                basePath="/photo-stories"
              />
            }
          />

          <Route path="/videography" element={<Videography />} />
          <Route path="/videography/:vimeoId" element={<VideoPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </SiteSettingsProvider>
  );
}

export default App;
