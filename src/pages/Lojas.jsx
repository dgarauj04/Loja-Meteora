import React from "react";
import BarraNavegacao from "@/components/BarraNavegacao";
import Rodape from "@/components/Rodape";
import Titulo from "@/components/Titulo";
import CarrinhoSuspenso from "@/components/CarrinhoSuspenso";
import lojasData from "@/mocks/lojas.json";

const Lojas = () => {
  return (
    <>
      <BarraNavegacao />
      <CarrinhoSuspenso />
      <main className="container-xxl my-4 my-md-5">
        <Titulo element="h1" className="text-center fw-semibold mb-5">
          Nossas Lojas
        </Titulo>

        <div className="row g-5">
          <div className="col-lg-6">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197545461934!2d-46.69089588502215!3d-23.56134688468279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57a3a9e53d79%3A0x3e4f3a7a2a6e08b1!2sR.%20Harmonia%2C%20277%20-%20Vila%20Madalena%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005435-000!5e0!3m2!1spt-BR!2sbr!4v1678886"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa com a localização da loja Meteora na Vila Madalena"
              ></iframe>
            </div>
          </div>
          <div className="col-lg-6 d-flex flex-column gap-4">
            {lojasData.map((loja) => (
              <div key={loja.id} className="border-bottom pb-3">
                <h3 className="fw-bold fs-4">{loja.nome}</h3>
                <p className="mb-1">{loja.endereco}</p>
                <p className="mb-2">{`${loja.cidade}, ${loja.estado} - CEP: ${loja.cep}`}</p>
                <p className="mb-1">
                  <i className="bi bi-telephone-fill me-2"></i>
                  <a href={`tel:${loja.telefone.replace(/\D/g, '')}`} className="text-decoration-none">{loja.telefone}</a>
                </p>
                <p className="mb-1">
                  <i className="bi bi-envelope-fill me-2"></i>
                  <a href={`mailto:${loja.email}`} className="text-decoration-none">{loja.email}</a>
                </p>
                <p className="mb-0 text-muted">
                  <i className="bi bi-clock-fill me-2"></i>
                  <small>{loja.horario}</small>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-5 my-5 text-center bg-warning-subtle text-warning-emphasis rounded-3">
            <h2 className="fw-bold text-warning">Seja um franqueado!</h2>
            <p className="lead col-lg-8 mx-auto">
                Quer fazer parte da família Meteora e levar nosso estilo para a sua cidade? Entre em contato com nosso time de expansão e saiba mais sobre nosso modelo de franquia.
            </p>
            <a href="mailto:franquias@meteora.com.br" className="btn btn-primary btn-lg">
                <i className="bi bi-shop me-2"></i>
                Quero ser um franqueado
            </a>
        </div>

      </main>
      <Rodape />
    </>
  );
};

export default Lojas;