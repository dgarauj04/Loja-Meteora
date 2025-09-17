import React from "react";
import Titulo from "@/components/Titulo";
import ValorFormatado from "@/components/ValorFormatado";
import VoucherInput from "@/components/VoucherInput";
import { formatadorMoeda } from "@/utils/formatadorMoeda";
import { useCarrinhoContext } from "@/hooks/useCarrinhoContext";

const ResumoCompra = () => {
  const { valorTotal, valorOriginal, quantidade, desconto, voucherAplicado } = useCarrinhoContext();
  
  return (
    <div className="bg-black p-4">
      <Titulo element="h5" className="text-center fw-bold">
        Sumário
      </Titulo>
      
      <div className="d-flex flex-row justify-content-between">
        <p className="m-0">{quantidade} {quantidade === 1 ? 'produto' : 'produtos'}</p>
        <span>{formatadorMoeda(valorOriginal)}</span>
      </div>
      
      {desconto > 0 && (
        <div className="d-flex flex-row justify-content-between text-success">
          <p className="m-0">Desconto ({voucherAplicado})</p>
          <span>-{formatadorMoeda(valorOriginal * desconto)}</span>
        </div>
      )}
      
      <div className="divisor__verde my-3" />
      
      <div className="d-flex flex-row justify-content-between">
        <p className="verde-limao m-0">Total</p>
        <ValorFormatado className="verde-limao" valor={valorTotal} />
      </div>
      
      <div className="divisor my-3" />
      
      <VoucherInput />
    </div>
  );
};

export default ResumoCompra;