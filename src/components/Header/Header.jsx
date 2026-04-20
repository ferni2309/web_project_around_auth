import React, { useState } from "react";
import logo from "../../images/Logo.png";
import { Link, useLocation } from "react-router-dom";

function Header({ userEmail, onSignOut }) {
  const location = useLocation();
  // Estado para controlar el menú hamburguesa en móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // Función para cerrar sesión y cerrar el menú
  function handleSignOut() {
    setIsMenuOpen(false);
    onSignOut();
  }

  const isLoggedIn = !!userEmail;

  return (
    <header className={`header ${isMenuOpen ? "header_opened" : ""}`}>
      {/* SECCIÓN MÓVIL: Aparece arriba del logo cuando el menú está abierto */}
      {isLoggedIn && (
        <div className={`header__user-info ${isMenuOpen ? "header__user-info_visible" : ""}`}>
          <span className="header__user-email">{userEmail}</span>
          <button onClick={handleSignOut} className="header__link header__button header__button_type_logout">
            Cerrar sesión
          </button>
        </div>
      )}

      <div className="header__main-container">
        <img src={logo} alt="Around the U.S logo" className="logo header__logo" />
        
        {/* Lógica para usuarios NO autorizados (Login/Register) */}
        {!isLoggedIn && (
          <div className="header__container">
            {location.pathname === "/signin" && (
              <Link to="/signup" className="header__link">Regístrate</Link>
            )}
            {location.pathname === "/signup" && (
              <Link to="/signin" className="header__link">Iniciar sesión</Link>
            )}
          </div>
        )}

        {/* Lógica para usuarios autorizados (Botón Hamburguesa/Cerrar) */}
        {isLoggedIn && (
          <>
            {/* Versión Escritorio: Oculta en móvil por CSS */}
            <div className="header__container header__container_desktop">
              <span className="header__user-email">{userEmail}</span>
              <button onClick={onSignOut} className="header__link header__button">
                Cerrar sesión
              </button>
            </div>

            {/* Botón Hamburguesa: Solo visible en móvil */}
            <button 
              className={`header__menu-button ${isMenuOpen ? "header__menu-button_type_close" : ""}`} 
              onClick={toggleMenu}
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
