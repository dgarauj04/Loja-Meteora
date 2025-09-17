import React from "react";
import { useFilter } from "@/context/FilterContext";

const Filtros = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    priceRange, 
    setPriceRange,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    clearFilters 
  } = useFilter();

  const categorias = ["Todos", "Camisetas", "Calças", "Calçados", "Casacos", "Óculos", "Bolsas", "Acessórios"];

  return (
    <div className="container my-4">
      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-2">
          <select 
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <label className="form-label small">
            Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-2">
          <select 
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="nome">Nome A-Z</option>
            <option value="preco-menor">Menor preço</option>
            <option value="preco-maior">Maior preço</option>
            <option value="avaliacao">Mais avaliados</option>
          </select>
        </div>

        <div className="col-12 col-lg-2">
          <button 
            className="btn btn-outline-secondary w-100"
            onClick={clearFilters}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filtros;