import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FilterProvider } from "./context/FilterContext";
import Home from "./pages/Home";
import Carrinho from "./pages/Carrinho";
import PaginaErro from "./pages/PaginaErro";
import Novidades from "./pages/Novidades";
import Promocoes from "./pages/Promocoes";
import Lojas from "./pages/Lojas";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CarrinhoProvider>
            <FilterProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/novidades" element={<Novidades />} />
                <Route path="/promocoes" element={<Promocoes />} />
                <Route path="/lojas" element={<Lojas />} />
                <Route path="*" element={<PaginaErro />} />
              </Routes>
            </FilterProvider>
          </CarrinhoProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;