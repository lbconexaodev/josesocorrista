import { ArrowRight, CheckCircle, GraduationCap, HeartPulse, Shield, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import type { ScrollToSection } from "../App";

type ProposalsPageProps = {
  scrollToSection: ScrollToSection;
};

export function ProposalsPage({ scrollToSection }: ProposalsPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl space-y-16 md:space-y-32 py-10 md:py-12"
    >
      <section className="max-w-4xl pt-8 md:pt-12">
        <span className="display-copy text-primary mb-6 block text-3xl sm:text-4xl md:text-5xl leading-none">
          Propostas para Boa Vista
        </span>
        <h2 className="display-copy text-4xl sm:text-5xl md:text-8xl text-on-surface leading-[0.98] md:leading-[0.95] mb-8 md:mb-12">
          Experiência no socorro, <br />
          <span className="text-primary">compromisso na Câmara.</span>
        </h2>
        <p className="text-lg md:text-xl font-medium text-on-surface-variant leading-relaxed max-w-2xl border-l-4 border-primary pl-6 md:pl-8">
          José Socorrista quer levar para o legislativo municipal a vivência de quem trabalha
          no atendimento de urgência, atua como bombeiro civil profissional e conhece de perto
          os desafios de quem protege a população.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 text-on-surface">
        <div className="lg:col-span-8 border border-hairline p-6 md:p-12 relative overflow-hidden bg-surface-container rounded-2xl md:rounded-3xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 md:mb-16">
            <div className="flex items-center gap-6">
              <Stethoscope className="w-10 h-10 text-primary" />
              <h3 className="display-copy text-3xl md:text-4xl">Saúde, Urgência e Cuidado</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-8">
              <h4 className="label text-primary uppercase">Resposta para a população</h4>
              <p className="text-on-surface-variant font-medium text-base md:text-lg leading-relaxed">
                Fiscalizar e cobrar melhorias nos serviços públicos que atendem a população,
                com foco em estrutura, equipamentos, prevenção, agilidade e respeito ao cidadão.
              </p>
              <ul className="space-y-6">
                {[
                  "Melhor estrutura para atendimento público",
                  "Condições adequadas para equipes de linha de frente",
                  "Transparência nos indicadores de saúde e emergência",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-sm tracking-[0.08em] uppercase font-black leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-hairline p-6 md:p-12 flex flex-col justify-center items-center text-center space-y-6 bg-surface rounded-2xl md:rounded-3xl">
              <HeartPulse className="w-14 h-14 text-primary" />
              <p className="display-copy text-4xl md:text-5xl text-primary">Cuidado público</p>
              <p className="label opacity-60 uppercase">Saúde com dignidade</p>
              <div className="h-px w-full bg-hairline" />
              <p className="text-base md:text-lg font-medium text-on-surface-variant leading-relaxed">
                "A população precisa de serviços acessíveis, humanos e bem estruturados."
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 border border-hairline p-6 md:p-12 flex flex-col justify-between bg-surface-container-high rounded-2xl md:rounded-3xl">
          <div>
            <GraduationCap className="w-12 h-12 mb-12 text-primary" />
            <h3 className="display-copy text-3xl md:text-4xl mb-8">Capacitação Profissional</h3>
            <p className="font-medium text-on-surface-variant text-lg leading-relaxed mb-12">
              Incentivar formação continuada para servidores, trabalhadores da saúde,
              profissionais de emergência, bombeiros civis e equipes que atuam na proteção da vida.
            </p>
          </div>
          <div className="space-y-6">
            <div className="h-[2px] w-full bg-hairline rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4" />
            </div>
            <p className="label text-primary uppercase">Qualificação e segurança</p>
          </div>
        </div>

        <div className="lg:col-span-12 border border-hairline p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-stretch bg-surface-container rounded-2xl md:rounded-3xl">
          <div>
            <div className="w-16 h-16 border border-primary flex items-center justify-center mb-8 rounded-xl">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="display-copy text-3xl md:text-4xl mb-6 leading-none">Defesa dos Profissionais</h3>
            <p className="text-on-surface-variant font-medium text-lg leading-relaxed">
              Pela sua trajetória no atendimento de urgência e na representação sindical, José
              conhece pautas de valorização, segurança no trabalho e respeito a quem serve a população.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            <div className="border border-outline bg-surface p-6 md:p-8 rounded-2xl space-y-5 shadow-sm">
              <h4 className="label text-primary uppercase font-black">Condições de trabalho</h4>
              <p className="display-copy text-2xl leading-tight text-on-surface">Quem cuida da população também precisa de cuidado</p>
              <p className="text-on-surface-variant font-medium text-base md:text-lg leading-relaxed">
                Cobrança por equipamentos, segurança operacional, capacitação, diálogo e respeito
                aos profissionais de diferentes áreas do serviço público.
              </p>
            </div>
            <div className="border border-outline bg-surface p-6 md:p-8 rounded-2xl space-y-5 shadow-sm">
              <h4 className="label text-primary uppercase font-black">Boa Vista</h4>
              <p className="display-copy text-2xl leading-tight text-on-surface">Mandato próximo da população</p>
              <p className="text-on-surface-variant font-medium text-base md:text-lg leading-relaxed">
                Ouvir bairros, trabalhadores e famílias para transformar problemas reais em cobranças públicas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 border border-hairline text-center relative overflow-hidden bg-surface-container rounded-2xl md:rounded-3xl">
        <h2 className="display-copy text-3xl md:text-6xl text-on-surface mb-10 md:mb-12 px-6">
          Quer caminhar com José Socorrista?
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 px-6 md:px-12">
          <button
            onClick={() => scrollToSection("contato")}
            className="bg-primary text-on-primary px-8 md:px-12 py-5 font-black tracking-[0.08em] md:tracking-[0.12em] text-xs md:text-sm uppercase hover:bg-on-surface hover:text-surface transition-all shadow-2xl rounded-full inline-flex items-center justify-center gap-4"
            type="button"
          >
            Quero ajudar agora <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="https://www.instagram.com/jose_socorrista?igsh=dWV4ZzE0aHJ1bzhn"
            className="border border-hairline text-on-surface px-8 md:px-12 py-5 font-black tracking-[0.08em] md:tracking-[0.12em] text-xs md:text-sm uppercase hover:bg-on-surface hover:text-surface transition-all rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Instagram
          </a>
        </div>
      </section>
    </motion.div>
  );
}
