import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Navbar from "../Sidebar/Navbar";
import Aulas from "../Aulas/Aulas";
import Disciplinas from "../Disciplinas/Disciplinas";
import Salas from "../Salas/Salas";
import Professor from "../Professor/Professor";
import Register from "../Register/Register";


function Rotas() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <div className="app">
                <Navbar />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/Aulas" element={<Aulas />} />
                  <Route path="/Disciplinas" element={<Disciplinas />} />
                  <Route path="/Salas" element={<Salas />} />
                  <Route path="/Professor" element={<Professor />} />
                  {/* Adicione mais rotas conforme necessário */}
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;