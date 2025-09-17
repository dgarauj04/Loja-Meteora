import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { carrinhoReducer } from "../reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const getCarrinhoFromStorage = () => {
  const savedCart = localStorage.getItem("meteora_carrinho");
  return savedCart ? JSON.parse(savedCart) : [];
};

const estadoInicial = getCarrinhoFromStorage();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [voucherAplicado, setVoucherAplicado] = useState("");

  const vouchersValidos = {
    "DESCONTO10": { desconto: 0.10, descricao: "10% de desconto" },
    "PRIMEIRACOMPRA": { desconto: 0.15, descricao: "15% de desconto primeira compra" },
    "METEORA20": { desconto: 0.20, descricao: "20% de desconto especial" }
  };

  const { totalTemp, quantidadeTemp } = useMemo(() => {
    return carrinho.reduce(
      (acumulador, produto) => ({
        quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
        totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
      }),
      {
        quantidadeTemp: 0,
        totalTemp: 0,
      }
    );
  }, [carrinho]);

  useEffect(() => {
    localStorage.setItem("meteora_carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    setQuantidade(quantidadeTemp);
    const valorComDesconto = totalTemp - (totalTemp * desconto);
    setValorTotal(valorComDesconto);
  }, [quantidadeTemp, totalTemp, desconto]);

  const aplicarVoucher = (codigo) => {
    const voucher = vouchersValidos[codigo.toUpperCase()];
    if (voucher) {
      setDesconto(voucher.desconto);
      setVoucherAplicado(codigo.toUpperCase());
      return { success: true, descricao: voucher.descricao };
    }
    return { success: false, error: "Voucher inválido" };
  };

  const removerVoucher = () => {
    setDesconto(0);
    setVoucherAplicado("");
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        dispatch,
        quantidade,
        valorTotal,
        valorOriginal: totalTemp,
        desconto,
        voucherAplicado,
        aplicarVoucher,
        removerVoucher,
        vouchersValidos
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};