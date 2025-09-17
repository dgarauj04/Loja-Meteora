import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("meteora_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Buscar usuários registrados
    const users = JSON.parse(localStorage.getItem("meteora_users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userSession = { id: user.id, name: user.name, email: user.email };
      setUser(userSession);
      localStorage.setItem("meteora_user", JSON.stringify(userSession));
      return { success: true };
    }
    
    return { success: false, error: "Email ou senha incorretos" };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("meteora_users") || "[]");
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, error: "Email já cadastrado" };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, 
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem("meteora_users", JSON.stringify(users));

    const userSession = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userSession);
    localStorage.setItem("meteora_user", JSON.stringify(userSession));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("meteora_user");
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};