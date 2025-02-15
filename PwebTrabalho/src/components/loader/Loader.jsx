import React from "react";
import Lottie from "lottie-react";
import "./loader.css";

/**
 * 
 * @description Componente que renderiza a animação de carregamento do site.
 */
export const Loader = () => {
  return (
    <>
        <div>
            <div className="loader">
                <div className="dot"></div>
            </div>
            <div className="loader">
                <div className="dot"></div>
            </div>
            <div className="loader">
                <div className="dot"></div>
            </div>
            <div className="loader">
                <div className="dot"></div>
            </div>
            <div className="loader">
                <div className="dot"></div>
            </div>
            <div className="loader">
                <div className="dot"></div>
            </div>
        </div>
    </>
  );
};
