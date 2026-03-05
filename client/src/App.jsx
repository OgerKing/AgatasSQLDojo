import { Routes, Route } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Zadania } from "./pages/Zadania";
import { ZadanieDetail } from "./pages/ZadanieDetail";
import { Teacher } from "./pages/Teacher";
import "./App.css";

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/zadania" element={<Zadania />} />
        <Route path="/zadanie/:id" element={<ZadanieDetail />} />
        <Route path="/nauczyciel" element={<Teacher />} />
      </Routes>
    </>
  );
}

export default App;
