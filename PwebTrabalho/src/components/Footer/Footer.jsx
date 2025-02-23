import React from 'react';
import { BsLinkedin, BsInstagram } from 'react-icons/bs';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Sistema Desenvolvido por 
        <a href="https://www.linkedin.com/in/julianreina/" target="_blank" rel="noopener noreferrer">
          Julian Reina <BsLinkedin />
        </a>
        <a href="https://www.instagram.com/juliaanreina/" target="_blank" rel="noopener noreferrer">
          <BsInstagram />
        </a>
      </p>
    </footer>
  );
};

export default Footer;