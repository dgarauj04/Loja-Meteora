import React, { useState } from "react";
import Botao from "@/components/Botao";
import Avaliacoes from "@/components/Avaliacoes";
import { formatadorMoeda } from "@/utils/formatadorMoeda";

const Produto = ({
  src,
  id,
  alt,
  titulo,
  descricao,
  preco,
  precoOriginal,
  promocao,
  estoque,
  avaliacoes,
  categoria,
  adicionarProduto,
  onNovaAvaliacao
}) => {
  const [mostrarAvaliacoes, setMostrarAvaliacoes] = useState(false);
  
  const mediaAvaliacoes = avaliacoes?.length > 0 
    ? (avaliacoes.reduce((acc, av) => acc + av.estrelas, 0) / avaliacoes.length).toFixed(1)
    : 0;

  const percentualDesconto = precoOriginal > preco 
    ? Math.round(((precoOriginal - preco) / precoOriginal) * 100)
    : 0;

  return (
    <div className="col-12 col-md-6 col-xxl-4 pb-4">
      <div className="card position-relative">
        {promocao && percentualDesconto > 0 && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-danger">-{percentualDesconto}%</span>
          </div>
        )}
        
        {estoque < 5 && estoque > 0 && (
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-warning text-dark">Últimas unidades!</span>
          </div>
        )}

        <img className="img-fluid" src={src} alt={alt} style={{ height: '300px', objectFit: 'cover' }} />
        
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold mb-0">{titulo}</h5>
            <small className="text-muted">{categoria}</small>
          </div>
          
          <p className="card-text">{descricao}</p>
          
          {avaliacoes?.length > 0 && (
            <div className="d-flex align-items-center mb-2">
              <div className="d-flex me-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{ 
                      color: star <= Math.round(mediaAvaliacoes) ? '#ffc107' : '#dee2e6',
                      fontSize: '0.9rem'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <small className="text-muted">
                {mediaAvaliacoes} ({avaliacoes.length})
              </small>
            </div>
          )}
          
          {/* Preços */}
          <div className="mb-3">
            {precoOriginal > preco ? (
              <div>
                <span className="text-muted text-decoration-line-through me-2">
                  {formatadorMoeda(precoOriginal)}
                </span>
                <span className="fw-bold text-danger fs-5">
                  {formatadorMoeda(preco)}
                </span>
              </div>
            ) : (
              <p className="fw-bold fs-5 mb-0">{formatadorMoeda(preco)}</p>
            )}
          </div>

          {/* Estoque */}
          <div className="mb-3">
            {estoque > 0 ? (
              <small className="text-success">
                <i className="bi bi-check-circle me-1"></i>
                {estoque} em estoque
              </small>
            ) : (
              <small className="text-danger">
                <i className="bi bi-x-circle me-1"></i>
                Fora de estoque
              </small>
            )}
          </div>

          <div className="d-flex flex-column gap-2">
            <Botao
              variant="primary"
              type="button"
              className="border-0"
              disabled={estoque === 0}
              handleClick={() =>
                adicionarProduto({ 
                  src, alt, id, titulo, descricao, preco, precoOriginal,
                  promocao, estoque, avaliacoes, categoria 
                })
              }
            >
              {estoque > 0 ? "Adicionar ao carrinho" : "Indisponível"}
            </Botao>

            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setMostrarAvaliacoes(!mostrarAvaliacoes)}
            >
              {mostrarAvaliacoes ? "Ocultar avaliações" : "Ver avaliações"}
            </button>
          </div>

          {mostrarAvaliacoes && (
            <Avaliacoes 
              avaliacoes={avaliacoes}
              produtoId={id}
              onNovaAvaliacao={onNovaAvaliacao}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Produto;
