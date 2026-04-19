import { Heart } from "lucide-react";
import { useState } from "react";

const pixKey = "00.000.000/0001-00";
const donationValues = ["R$ 10", "R$ 25", "R$ 50", "R$ 100", "R$ 200", "R$ 500", "Outro valor"];

export function DonatePage() {
  const [copied, setCopied] = useState(false);

  const copyPixKey = async () => {
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
      <div className="border border-primary/30 p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl bg-primary/5 relative overflow-hidden transition-all duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 -translate-y-32 translate-x-32 rounded-full blur-3xl text-primary" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
          <div>
            <Heart className="w-12 h-12 text-primary mb-8" />
            <h2 className="display-copy text-3xl md:text-5xl text-on-surface mb-6">
              Financiamento Coletivo
            </h2>
            <p className="text-on-surface-variant font-medium leading-relaxed text-lg mb-8">
              Sua contribuição fortalece materiais, encontros comunitários e logística da pré-campanha.
              Todo recurso deve ser acompanhado com transparência.
            </p>
            <div className="flex flex-wrap gap-3 text-on-surface">
              {donationValues.map((value) => (
                <button
                  key={value}
                  className="border border-hairline px-5 py-3 rounded-full hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-xs font-black uppercase tracking-[0.12em] min-w-[90px]"
                  type="button"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface p-6 md:p-12 rounded-2xl md:rounded-3xl border border-hairline shadow-2xl space-y-8">
            <div className="text-center">
              <p className="label mb-4">PIX Chave CNPJ</p>
              <p className="font-mono text-base sm:text-xl text-primary font-bold break-all">{pixKey}</p>
            </div>
            <div className="aspect-square bg-white p-4 rounded-3xl flex items-center justify-center max-w-[200px] mx-auto border border-hairline">
              <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-[10px] text-slate-400 font-mono text-center px-4">
                QR Code PIX da pré-campanha
              </div>
            </div>
            <button
              onClick={copyPixKey}
              className="w-full bg-primary text-on-primary py-4 rounded-full font-black uppercase tracking-[0.14em] text-sm hover:scale-[1.02] transition-transform active:scale-95"
              type="button"
            >
              {copied ? "Chave copiada" : "Copiar chave PIX"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
