import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const LoginModal = ({ show, onHide, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = login(email, password);
    
    if (result.success) {
      onHide();
      setEmail("");
      setPassword("");
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
            <h5 className="modal-title">Entrar na sua conta</h5>
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
                  required 
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>
            
            <div className="text-center mt-3">
              <p className="mb-0">
                Não tem uma conta? {" "}
                <button 
                  type="button" 
                  className="btn btn-link p-0"
                  onClick={switchToRegister}
                >
                  Cadastre-se
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;