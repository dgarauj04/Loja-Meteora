import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const StarRating = ({ rating, onRate, readOnly = false }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="d-flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`btn btn-link p-0 me-1 ${readOnly ? 'pe-none' : ''}`}
          style={{ 
            color: star <= (hoveredStar || rating) ? '#ffc107' : '#dee2e6',
            fontSize: '1.2rem'
          }}
          onMouseEnter={() => !readOnly && setHoveredStar(star)}
          onMouseLeave={() => !readOnly && setHoveredStar(0)}
          onClick={() => !readOnly && onRate && onRate(star)}
          disabled={readOnly}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const Avaliacoes = ({ avaliacoes = [], produtoId, onNovaAvaliacao }) => {
  const [novaAvaliacao, setNovaAvaliacao] = useState({ estrelas: 0, comentario: "" });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const { user } = useAuth();

  const mediaAvaliacoes = avaliacoes.length > 0 
    ? (avaliacoes.reduce((acc, av) => acc + av.estrelas, 0) / avaliacoes.length).toFixed(1)
    : 0;

  const handleSubmitAvaliacao = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Faça login para avaliar produtos");
      return;
    }

    if (novaAvaliacao.estrelas === 0) {
      alert("Selecione uma avaliação de estrelas");
      return;
    }

    const avaliacao = {
      usuario: user.name,
      estrelas: novaAvaliacao.estrelas,
      comentario: novaAvaliacao.comentario,
      data: new Date().toISOString()
    };

    if (onNovaAvaliacao) {
      onNovaAvaliacao(produtoId, avaliacao);
    }

    setNovaAvaliacao({ estrelas: 0, comentario: "" });
    setMostrarFormulario(false);
  };

  return (
    <div className="mt-3">
      <div className="d-flex align-items-center mb-3">
        <h6 className="mb-0 me-3">Avaliações</h6>
        {avaliacoes.length > 0 && (
          <div className="d-flex align-items-center">
            <StarRating rating={Math.round(mediaAvaliacoes)} readOnly />
            <span className="ms-2 text-muted">
              {mediaAvaliacoes} ({avaliacoes.length} {avaliacoes.length === 1 ? 'avaliação' : 'avaliações'})
            </span>
          </div>
        )}
      </div>

      {avaliacoes.length > 0 ? (
        <div className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {avaliacoes.map((avaliacao, index) => (
            <div key={index} className="border rounded p-2 mb-2">
              <div className="d-flex align-items-center mb-1">
                <strong className="me-2">{avaliacao.usuario}</strong>
                <StarRating rating={avaliacao.estrelas} readOnly />
              </div>
              {avaliacao.comentario && (
                <p className="mb-0 text-muted small">{avaliacao.comentario}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted mb-3">Seja o primeiro a avaliar este produto!</p>
      )}

      {!mostrarFormulario && (
        <button 
          className="btn btn-outline-primary btn-sm"
          onClick={() => setMostrarFormulario(true)}
        >
          {user ? "Avaliar produto" : "Faça login para avaliar"}
        </button>
      )}

      {mostrarFormulario && user && (
        <form onSubmit={handleSubmitAvaliacao} className="border rounded p-3 bg-light">
          <h6>Sua avaliação</h6>
          
          <div className="mb-3">
            <label className="form-label">Classificação:</label>
            <StarRating 
              rating={novaAvaliacao.estrelas}
              onRate={(rating) => setNovaAvaliacao(prev => ({ ...prev, estrelas: rating }))}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comentario" className="form-label">Comentário (opcional):</label>
            <textarea 
              id="comentario"
              className="form-control" 
              rows="3"
              value={novaAvaliacao.comentario}
              onChange={(e) => setNovaAvaliacao(prev => ({ ...prev, comentario: e.target.value }))}
              placeholder="Conte sobre sua experiência com o produto..."
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary btn-sm">
              Enviar avaliação
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setMostrarFormulario(false);
                setNovaAvaliacao({ estrelas: 0, comentario: "" });
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Avaliacoes;