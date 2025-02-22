import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Rotas from './components/Rotas';
import Footer from './components/Footer/Footer';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rotas />
    <Footer />
  </StrictMode>,
);
