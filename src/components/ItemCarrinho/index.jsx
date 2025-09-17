import React from "react";
import Botao from "@/components/Botao";
import Quantidade from "@/components/Quantidade";
import ValorFormatado from "@/components/ValorFormatado";
import InfoItemCarrinho from "./InfoItemCarrinho";
import { useCarrinhoContext } from "@/hooks/useCarrinhoContext";
import { formatadorMoeda } from "@/utils/formatadorMoeda";

const ItemCarrinho = ({ itemCarrinho }) => {
  const { adicionarProduto, removerProduto, removerProdutoCarrinho } =
    useCarrinhoContext();
    
  const subtotal = itemCarrinho.preco * itemCarrinho.quantidade;
  
  return (
    <li key={itemCarrinho.id}>
      <>
        <div className="produto">
          <img
            className="imagem__produto"
            src={itemCarrinho.src}
            alt={itemCarrinho.alt}
          />
          <InfoItemCarrinho itemCarrinho={itemCarrinho} />
          
          <div className="d-flex flex-column align-items-center">
            <ValorFormatado valor={itemCarrinho.preco} />
            <small className="text-muted">Preço unitário</small>
          </div>
          
          <Quantidade
            itemCarrinho={itemCarrinho}
            adicionarProduto={adicionarProduto}
            removerProduto={removerProduto}
          />
          
          <div className="d-flex flex-column align-items-center">
            <strong className="text-success">{formatadorMoeda(subtotal)}</strong>
            <small className="text-muted">Subtotal</small>
          </div>
          
          <Botao
            variant="deleteItem"
            aria-label="Excluir produto"
            handleClick={() => removerProdutoCarrinho(itemCarrinho.id)}
            title="Remover produto do carrinho"
          >
            delete_forever
          </Botao>
        </div>
        <div className="divisor my-5" />
      </>
    </li>
  );
};

export default ItemCarrinho;