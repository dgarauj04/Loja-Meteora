import React, { useState, useEffect, useMemo } from "react";
import Produto from "./Produto";
import produtosData from "@/mocks/produtos.json";
import Titulo from "@/components/Titulo";
import { useCarrinhoContext } from "@/hooks/useCarrinhoContext";
import { useFilter } from "@/context/FilterContext";

const Produtos = () => {
  const { adicionarProduto } = useCarrinhoContext();
  const { selectedCategory, priceRange, searchTerm, sortBy } = useFilter();
  const [produtos, setProdutos] = useState(produtosData);

  useEffect(() => {
    const avaliacoesSalvas = localStorage.getItem("meteora_avaliacoes");
    if (avaliacoesSalvas) {
      const avaliacoes = JSON.parse(avaliacoesSalvas);
      const produtosAtualizados = produtos.map(produto => ({
        ...produto,
        avaliacoes: avaliacoes[produto.id] || produto.avaliacoes || []
      }));
      setProdutos(produtosAtualizados);
    }
  }, []);

  const handleNovaAvaliacao = (produtoId, novaAvaliacao) => {
    const avaliacoesSalvas = JSON.parse(localStorage.getItem("meteora_avaliacoes") || "{}");
    
    if (!avaliacoesSalvas[produtoId]) {
      avaliacoesSalvas[produtoId] = [];
    }
    
    avaliacoesSalvas[produtoId].push(novaAvaliacao);
    localStorage.setItem("meteora_avaliacoes", JSON.stringify(avaliacoesSalvas));

    setProdutos(prevProdutos => 
      prevProdutos.map(produto => 
        produto.id === produtoId 
          ? { ...produto, avaliacoes: avaliacoesSalvas[produtoId] }
          : produto
      )
    );
  };

  const produtosFiltrados = useMemo(() => {
    let resultado = produtos;

    if (selectedCategory !== "Todos") {
      resultado = resultado.filter(produto => produto.categoria === selectedCategory);
    }

    resultado = resultado.filter(produto => 
      produto.preco >= priceRange[0] && produto.preco <= priceRange[1]
    );

    if (searchTerm) {
      resultado = resultado.filter(produto =>
        produto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "preco-menor":
        resultado.sort((a, b) => a.preco - b.preco);
        break;
      case "preco-maior":
        resultado.sort((a, b) => b.preco - a.preco);
        break;
      case "avaliacao":
        resultado.sort((a, b) => {
          const mediaA = a.avaliacoes?.length > 0 
            ? a.avaliacoes.reduce((acc, av) => acc + av.estrelas, 0) / a.avaliacoes.length 
            : 0;
          const mediaB = b.avaliacoes?.length > 0 
            ? b.avaliacoes.reduce((acc, av) => acc + av.estrelas, 0) / b.avaliacoes.length 
            : 0;
          return mediaB - mediaA;
        });
        break;
      case "nome":
      default:
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
    }

    return resultado;
  }, [produtos, selectedCategory, priceRange, searchTerm, sortBy]);

  const produtosPromocao = useMemo(() => {
    return produtos.filter(produto => produto.promocao);
  }, [produtos]);

  return (
    <section role="produtos" aria-label="Produtos">
      {produtosPromocao.length > 0 && selectedCategory === "Todos" && !searchTerm && (
        <div className="mb-5">
          <Titulo>🔥 Promoções Imperdíveis!</Titulo>
          <div className="container row mx-auto">
            {produtosPromocao.slice(0, 3).map((produto) => (
              <Produto
                key={`promo-${produto.id}`}
                {...produto}
                adicionarProduto={adicionarProduto}
                onNovaAvaliacao={handleNovaAvaliacao}
              />
            ))}
          </div>
        </div>
      )}

      <Titulo>
        {selectedCategory !== "Todos" 
          ? `${selectedCategory} (${produtosFiltrados.length} produtos)`
          : `Produtos que estão bombando! (${produtosFiltrados.length})`
        }
      </Titulo>

      <div className="container row mx-auto">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <Produto
              key={produto.id}
              {...produto}
              adicionarProduto={adicionarProduto}
              onNovaAvaliacao={handleNovaAvaliacao}
            />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <i className="bi bi-search fs-1 text-muted"></i>
            <h4 className="mt-3 text-muted">Nenhum produto encontrado</h4>
            <p className="text-muted">Tente ajustar os filtros de busca</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Produtos;
