import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const RegisterModal = ({ show, onHide, switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    const result = register(name, email, password);
    
    if (result.success) {
      onHide();
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Criar sua conta</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onHide}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Senha</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="6"
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar senha</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength="6"
                  required 
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>
            
            <div className="text-center mt-3">
              <p className="mb-0">
                Já tem uma conta? {" "}
                <button 
                  type="button" 
                  className="btn btn-link p-0"
                  onClick={switchToLogin}
                >
                  Entrar
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;