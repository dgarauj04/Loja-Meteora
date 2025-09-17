import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter deve ser usado dentro de um FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nome");

  const clearFilters = () => {
    setSelectedCategory("Todos");
    setPriceRange([0, 500]);
    setSearchTerm("");
    setSortBy("nome");
  };

  const value = {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    clearFilters
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};