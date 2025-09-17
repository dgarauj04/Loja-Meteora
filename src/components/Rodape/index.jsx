import React, { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const Rodape = () => {
  const [donationAmount, setDonationAmount] = useState("5.00");
  const [showDonationModal, setShowDonationModal] = useState(false);

  const paypalOptions = {
    "client-id": "AVItH-nvL3xnjumg2jmzpudjdT19qDf1I0oU2am29rNNOlj7qTv7e5IMNRnlaqYhAkGumeckCSzgY8n4",
    currency: "BRL",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: donationAmount,
            currency_code: "BRL",
          },
          description: "Doação para o projeto Meteora",
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Obrigado, ${name}! Sua doação de R$${donationAmount} foi processada com sucesso.`);
      setShowDonationModal(false);
    });
  };

  const onError = (err) => {
    console.error("Erro no pagamento:", err);
    alert("Erro ao processar o pagamento. Tente novamente.");
  };

  return (
    <>
      <footer className="bg-black text-bg-dark pt-5 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
              <h5 className="text-white mb-3">Meteora</h5>
              <p className="text-muted small">
                Sua loja de moda online com as melhores tendências e produtos de qualidade.
              </p>
              <div className="alert alert-warning small" role="alert">
                <i className="bi bi-info-circle me-1"></i>
                Esta é uma loja fictícia criada para fins educacionais.
              </div>
            </div>

            <div className="col-md-2 mb-4">
              <h6 className="text-white mb-3">Links</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-muted text-decoration-none">Início</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Produtos</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Categorias</a></li>
                <li><a href="#" className="text-muted text-decoration-none">Promoções</a></li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h6 className="text-white mb-3">Atendimento</h6>
              <ul className="list-unstyled text-muted small">
                <li>
                  <i className="bi bi-envelope me-2"></i>
                  <a href="mailto:contato@meteora.com.br" className="text-muted text-decoration-none">
                    contato@meteora.com.br
                  </a>
                </li>
                <li>
                  <i className="bi bi-telephone me-2"></i>
                  <a href="tel:+5511999999999" className="text-muted text-decoration-none">
                    (11) 99999-9999
                  </a>
                </li>
                <li>
                  <i className="bi bi-clock me-2"></i>
                  Seg-Sex: 9h às 18h
                </li>
              </ul>
            </div>

            <div className="col-md-2 mb-4">
              <h6 className="text-white mb-3">Redes Sociais</h6>
              <div className="d-flex flex-column gap-2">
                <a href="https://instagram.com/dgaraujoo_" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">
                  <i className="bi bi-instagram me-2"></i>Instagram
                </a>
                <a href="https://linkedin.com/in/douglas-araujo-dgprogdev" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">
                  <i className="bi bi-linkedin me-2"></i>LinkedIn
                </a>
                <a href="https://github.com/dgarauj04" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">
                  <i className="bi bi-github me-2"></i>GitHub
                </a>
              </div>
            </div>

            <div className="col-md-2 mb-4">
              <h6 className="text-white mb-3">Apoie o Projeto</h6>
              <p className="text-muted small mb-3">
                Gostou do projeto? Ajude a criar mais!
              </p>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowDonationModal(true)}
              >
                <i className="bi bi-paypal me-1"></i>
                Doar via PayPal
              </button>
              <p className="text-muted small mt-2">
                <a href="https://dgaraujo-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-muted text-decoration-none">
                  <i className="bi bi-globe me-1"></i>
                  Ver Portfólio
                </a>
              </p>
            </div>
          </div>

          <hr className="border-secondary my-4" />

          <div className="row">
            <div className="col-md-6">
              <p className="text-muted small mb-0">
                © 2025 Meteora E-commerce. Projeto educacional desenvolvido com React + Bootstrap.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="text-muted small mb-0">
                <i className="bi bi-heart-fill text-danger me-1"></i>
                Feito com amor para aprendizado
              </p>
            </div>
          </div>
        </div>
      </footer>

      {showDonationModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Faça uma doação</h5>
                <button type="button" className="btn-close" onClick={() => setShowDonationModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="donationAmount" className="form-label">Valor da doação (R$)</label>
                  <select 
                    className="form-select" 
                    value={donationAmount} 
                    onChange={(e) => setDonationAmount(e.target.value)}
                  >
                    <option value="5.00">R$ 5,00</option>
                    <option value="10.00">R$ 10,00</option>
                    <option value="20.00">R$ 20,00</option>
                    <option value="50.00">R$ 50,00</option>
                    <option value="custom">Outro valor</option>
                  </select>
                </div>
                
                {donationAmount === "custom" && (
                  <div className="mb-3">
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Digite o valor" 
                      min="1"
                      step="0.01"
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                  </div>
                )}
                
                <PayPalScriptProvider options={paypalOptions}>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    style={{ layout: "vertical" }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rodape;