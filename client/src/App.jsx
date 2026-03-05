import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Zadania } from "./pages/Zadania";
import { ZadanieDetail } from "./pages/ZadanieDetail";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/zadania" element={<Zadania />} />
      <Route path="/zadanie/:id" element={<ZadanieDetail />} />
    </Routes>
  );
}

export default App;
