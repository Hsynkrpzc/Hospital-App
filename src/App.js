import React from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import HastaEkle from "./pages/HastaEkle";
import Hastalar from "./pages/Hastalar"; 
import Home from "./pages/Home";
import RandevuEkle from "./pages/RandevuEkle";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/hastalar" element={<Hastalar/>} />
      <Route path="/hasta-ekle" element={<HastaEkle/>} />
      <Route path="/randevu-ekle" element={<RandevuEkle/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

