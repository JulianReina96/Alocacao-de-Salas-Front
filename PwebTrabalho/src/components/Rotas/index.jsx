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
import ProtectedRoute from "../ProtectedRoute";


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
                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/Aulas" element={<ProtectedRoute><Aulas /></ProtectedRoute>} />
                  <Route path="/Disciplinas" element={<ProtectedRoute><Disciplinas /></ProtectedRoute>} />
                  <Route path="/Salas" element={<ProtectedRoute><Salas /></ProtectedRoute>} />
                  <Route path="/Professor" element={<ProtectedRoute><Professor /></ProtectedRoute>} />
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