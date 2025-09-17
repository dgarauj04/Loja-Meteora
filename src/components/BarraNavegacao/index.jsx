import React, { useState } from "react";
import Menu from "./Menu";
import Logo from "./Logo";
import BotaoTogglerMenu from "./BotaoTogglerMenu";
import BotaoCarrinho from "./BotaoCarrinho";
import CampoTexto from "@/components/CampoTexto";
import Botao from "@/components/Botao";
import LoginModal from "@/components/Auth/LoginModal";
import RegisterModal from "@/components/Auth/RegisterModal";
import { useCarrinhoContext } from "@/hooks/useCarrinhoContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useFilter } from "@/context/FilterContext";
import { useLocation } from "react-router-dom";

const BarraNavegacao = () => {
  const location = useLocation();
  const ehAPaginaCarrinho = location.pathname === "/carrinho";
  const { quantidade } = useCarrinhoContext();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { searchTerm, setSearchTerm } = useFilter();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const produtosSection = document.querySelector('[role="produtos"]');
    if (produtosSection) {
      produtosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-md bg-black navbar-dark">
        <div className="container-fluid custom-margin">
          <Logo />
          <div className="d-flex flex-row-reverse align-items-center">
            <BotaoTogglerMenu />
            
            <div className="d-md-none d-flex align-items-center me-2">
              <button 
                className="btn btn-outline-light btn-sm me-2 theme-toggle-btn"
                onClick={toggleTheme}
                title={isDarkMode ? "Modo claro" : "Modo escuro"}
              >
              {isDarkMode
                 ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill fade-icon" viewBox="0 0 16 16">
                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                  </svg>
                 : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill fade-icon" style={{ color: "black" }} viewBox="0 0 16 16">
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                  </svg>
                }
                </button>
              
              {user ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-light btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li><span className="dropdown-item-text">Olá, {user.name}</span></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>Sair</button></li>
                  </ul>
                </div>
              ) : (
                <button 
                  className="btn btn-outline-light btn-sm me-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
                </button>
              )}
            </div>
            
            <BotaoCarrinho
              className={`d-md-none ${ehAPaginaCarrinho && "d-none"}`}
              quantidadeProdutos={quantidade}
            />
          </div>
          
          <div className="collapse navbar-collapse" id="conteudoBarraNavegacao">
            <Menu />
            
            <form className="d-flex me-3" role="search" onSubmit={handleSearch}>
              <CampoTexto
                className="me-2"
                type="search"
                placeholder="Digite o nome do produto"
                aria-label="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Botao type="submit">Pesquisar</Botao>
            </form>

            <div className="d-none d-md-flex align-items-center me-3">
              <button 
                className="btn btn-outline-light me-2 theme-toggle-btn"
                onClick={toggleTheme}
                title={isDarkMode ? "Modo claro" : "Modo escuro"}
              >
                {isDarkMode
                 ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill fade-icon" viewBox="0 0 16 16">
                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                  </svg>
                 : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill fade-icon" style={{ color: "black" }} viewBox="0 0 16 16">
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
                  </svg>
                }
              </button>
              
              {user ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person me-1"></i>
                    {user.name}
                  </button>
                  <ul className="dropdown-menu">
                    <li><span className="dropdown-item-text">Logado como {user.name}</span></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>
                      <i className="bi bi-box-arrow-right me-1"></i>
                      Sair
                    </button></li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-outline-light"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Entrar
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Cadastrar
                  </button>
                </div>
              )}
            </div>
            
            <BotaoCarrinho
              className={`d-none d-md-block ${
                ehAPaginaCarrinho && "d-md-none"
              }`}
              quantidadeProdutos={quantidade}
            />
          </div>
        </div>
      </nav>

      <LoginModal 
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        switchToRegister={switchToRegister}
      />
      <RegisterModal 
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        switchToLogin={switchToLogin}
      />
    </header>
  );
};

export default BarraNavegacao;
