import React, { useState } from "react";
import { useCarrinhoContext } from "@/hooks/useCarrinhoContext";

const VoucherInput = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
  const { aplicarVoucher, removerVoucher, voucherAplicado } = useCarrinhoContext();

  const handleAplicarVoucher = (e) => {
    e.preventDefault();
    
    if (!voucherCode.trim()) {
      setMessage("Digite um código de voucher");
      setMessageType("danger");
      return;
    }

    const result = aplicarVoucher(voucherCode);
    
    if (result.success) {
      setMessage(`Voucher aplicado: ${result.descricao}`);
      setMessageType("success");
      setVoucherCode("");
    } else {
      setMessage(result.error);
      setMessageType("danger");
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleRemoverVoucher = () => {
    removerVoucher();
    setMessage("Voucher removido");
    setMessageType("success");
    
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  return (
    <div className="mb-3">
      <h6>Cupom de desconto</h6>
      
      {!voucherAplicado ? (
        <form onSubmit={handleAplicarVoucher}>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Digite o código do voucher"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
            />
            <button className="btn btn-outline-primary" type="submit">
              Aplicar
            </button>
          </div>
        </form>
      ) : (
        <div className="d-flex align-items-center justify-content-between p-2 bg-success bg-opacity-10 border border-success rounded mb-2">
          <span className="text-success">
            <i className="bi bi-check-circle me-1"></i>
            Voucher {voucherAplicado} aplicado
          </span>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={handleRemoverVoucher}
          >
            Remover
          </button>
        </div>
      )}

      {message && (
        <div className={`alert alert-${messageType} alert-sm`} role="alert">
          {message}
        </div>
      )}

      <div className="mt-2">
        <small className="text-muted">
          <strong>Vouchers disponíveis:</strong><br />
          • DESCONTO10 - 10% de desconto<br />
          • PRIMEIRACOMPRA - 15% primeira compra<br />
          • METEORA20 - 20% desconto especial
        </small>
      </div>
    </div>
  );
};

export default VoucherInput;