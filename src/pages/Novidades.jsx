import React, { useState, useMemo, useEffect } from "react";
import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";
import Titulo from "@/components/Titulo";
import Produto from "@/components/Produtos/Produto";
import produtosData from "@/mocks/produtos.json";
import { useCarrinhoContext } from "@/hooks/useCarrinhoContext";
import CarrinhoSuspenso from "@/components/CarrinhoSuspenso";

const Novidades = () => {
  const { adicionarProduto } = useCarrinhoContext();
  const [produtos, setProdutos] = useState(produtosData);

  useEffect(() => {
    const avaliacoesSalvas = localStorage.getItem("meteora_avaliacoes");
    if (avaliacoesSalvas) {
      const avaliacoes = JSON.parse(avaliacoesSalvas);
      const produtosAtualizados = produtosData.map((produto) => ({
        ...produto,
        avaliacoes: avaliacoes[produto.id] || produto.avaliacoes || [],
      }));
      setProdutos(produtosAtualizados);
    }
  }, []);

  const handleNovaAvaliacao = (produtoId, novaAvaliacao) => {
    const avaliacoesSalvas = JSON.parse(
      localStorage.getItem("meteora_avaliacoes") || "{}"
    );

    if (!avaliacoesSalvas[produtoId]) {
      avaliacoesSalvas[produtoId] = [];
    }

    avaliacoesSalvas[produtoId].push(novaAvaliacao);
    localStorage.setItem("meteora_avaliacoes", JSON.stringify(avaliacoesSalvas));

    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) =>
        produto.id === produtoId
          ? { ...produto, avaliacoes: avaliacoesSalvas[produtoId] }
          : produto
      )
    );
  };

  const produtosNovidades = useMemo(() => {
    return [...produtos].sort((a, b) => b.id - a.id).slice(0, 6);
  }, [produtos]);

  return (
    <>
      <BarraNavegacao />
      <CarrinhoSuspenso />
      <main className="container-xxl">
        <Titulo element="h1" className="text-center fw-semibold my-3 my-md-5">
          ✨ Novidades
        </Titulo>
        <div className="container row mx-auto">
          {produtosNovidades.map((produto) => (
            <Produto
              key={produto.id}
              {...produto}
              adicionarProduto={adicionarProduto}
              onNovaAvaliacao={handleNovaAvaliacao}
            />
          ))}
        </div>
      </main>
      <Rodape />
    </>
  );
};

export default Novidades;