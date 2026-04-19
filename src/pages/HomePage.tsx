import { Ambulance, ArrowRight, Flame, Shield, Stethoscope, Users } from "lucide-react";
import { motion } from "motion/react";
import type { ScrollToSection } from "../App";
import { VisualCarousel } from "../components/VisualCarousel";
import { images } from "../data/images";

type HomePageProps = {
  scrollToSection: ScrollToSection;
};

const profileHighlights = [
  "Pré-candidato de direita a deputado estadual por Roraima",
  "José Carlos, conhecido como José Socorrista",
  "42 anos, casado, pai de 5 filhos e morador do Senador Hélio Campos",
  "Do transporte pesado à linha de frente do cuidado público",
  "Atua como condutor de ambulância no SAMU Boa Vista",
  "Experiência na UTE Jaguatirica II e na rotina de urgência",
];

const pillars = [
  {
    title: "Urgência e Saúde",
    icon: Stethoscope,
    description:
      "Propostas inspiradas na rotina de quem conhece a linha de frente e sabe onde a resposta pública precisa melhorar.",
    image: images.health,
  },
  {
    title: "Valorização Profissional",
    icon: Users,
    description:
      "Defesa de melhores condições para quem trabalha na saúde, emergência, segurança, transporte, prevenção e cuidado com a população.",
    image: images.safety,
  },
  {
    title: "Prevenção e Resposta",
    icon: Flame,
    description:
      "Olhar atento para prevenção, orientação comunitária e preparo das equipes que protegem vidas em Roraima.",
    image: images.transparency,
  },
];

export function HomePage({ scrollToSection }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-20 md:space-y-32 flex flex-col items-center w-full"
    >
      <section className="relative min-h-[78vh] md:min-h-[90vh] flex items-center overflow-hidden mx-3 md:mx-8 border border-hairline group rounded-2xl md:rounded-3xl w-[calc(100%-1.5rem)] md:w-[calc(100%-4rem)]">
        <div className="absolute inset-0 z-0">
          <img
            src={images.portrait}
            alt="José Socorrista em foto de campanha"
            className="w-full h-full object-cover object-[64%_22%] md:object-[63%_20%] scale-105 group-hover:scale-100 transition-all duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/5 dark:from-black/75 dark:via-black/35 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>

        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pt-24 md:pt-20 pb-8 md:pb-0">
          <div className="md:col-span-12 lg:col-span-9">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="label text-white mb-6 bg-black/70 hidden sm:inline-block px-4 py-1 rounded-full border border-white/20 uppercase shadow-xl"
            >
              Pré-candidato de direita a deputado estadual por Roraima
            </motion.div>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="display-copy hero-readable text-5xl sm:text-6xl md:text-9xl lg:text-[140px] text-white leading-[0.85] mb-8 md:mb-12"
            >
              José <br />
              <span className="text-[#ffe44c]">Socorrista.</span>
            </motion.h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 md:gap-12 border-t border-white/30 pt-10 md:pt-12">
              <p className="text-readable-muted text-base font-medium max-w-xl leading-relaxed">
                José Carlos, o José Socorrista, não fala de teoria. Conhece a realidade de quem
                trabalha duro, vive a urgência de perto e sabe onde o serviço público precisa melhorar.
              </p>
              <div className="flex flex-wrap gap-6 md:gap-8">
                <div className="text-left md:text-right">
                  <p className="label text-white/75">Moradia</p>
                  <p className="display-copy text-white text-xl hero-readable">Senador Hélio Campos</p>
                </div>
                <div className="text-left md:text-right">
                  <p className="label text-white/75">Causa</p>
                  <p className="display-copy text-white text-xl hero-readable">Urgência e cuidado</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-7 md:mt-8">
              {profileHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="bg-black/70 border border-white/15 rounded-2xl px-4 py-3 text-[11px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.12em] text-white/90 shadow-xl leading-relaxed"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full border-y border-hairline py-6 overflow-hidden bg-primary transition-colors duration-500">
        <div className="flex whitespace-nowrap gap-24 animate-marquee items-center text-on-primary">
          {[1, 2, 3, 4].map((item) => (
            <span key={item} className="display-copy text-xl md:text-2xl tracking-[0.08em] md:tracking-[0.12em] uppercase">
              • Roraima • Saúde • Emergência • Profissionais • Família • Trabalho •
            </span>
          ))}
        </div>
      </div>

      <section className="container mx-auto px-4 md:px-12 max-w-7xl">
        <div className="sidebar-title mb-10 md:mb-16 px-2 md:px-4">Trajetória e Compromissos</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-px md:bg-hairline rounded-3xl overflow-hidden md:border border-hairline">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className="bg-surface-container group p-6 md:p-8 rounded-2xl md:rounded-none">
              <div className="aspect-video overflow-hidden rounded-2xl border border-hairline mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="display-copy text-2xl text-on-surface">{pillar.title}</h3>
                <span className="label text-primary uppercase">
                  0{index + 1}
                </span>
              </div>
              <p className="text-on-surface-variant font-medium leading-relaxed text-base mb-8">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-12 max-w-7xl">
        <div className="sidebar-title mb-10 md:mb-16 px-2 md:px-4">Impacto em Ação</div>
        <VisualCarousel />
      </section>

      <section className="py-16 md:py-32 relative overflow-hidden bg-surface-container mx-3 md:mx-8 border border-hairline my-10 md:my-24 rounded-2xl md:rounded-3xl shadow-2xl">
        <div className="container mx-auto px-5 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/3] border border-hairline overflow-hidden p-2 bg-surface dark:bg-[#0a0a0a] rounded-3xl">
              <img
                src={images.volunteer}
                alt="José Socorrista em arte de campanha"
                className="w-full h-full object-cover object-center rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 md:-right-8 border border-primary/30 p-6 md:p-8 bg-primary text-on-primary shadow-2xl rounded-2xl">
              <Ambulance className="w-8 h-8 mb-3" />
              <p className="display-copy text-2xl md:text-4xl leading-none mb-2">
                Urgência
              </p>
              <p className="label uppercase font-black text-xs tracking-[0.14em] text-on-primary/90">
                vivência real
              </p>
            </div>
          </div>
          <div className="space-y-10 md:space-y-12">
            <h2 className="display-copy text-4xl md:text-7xl text-on-surface leading-tight">
              Da linha de frente para a <br />
              <span className="text-primary">Assembleia.</span>
            </h2>
            <p className="text-on-surface-variant font-medium text-lg leading-relaxed max-w-xl">
              Antes de vestir a farda do socorro, trabalhou como motorista de caminhão e carreta.
              Essa vivência aproxima sua caminhada de quem trabalha todos os dias para sustentar a família.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-hairline rounded-2xl p-5 bg-surface">
                <Flame className="w-6 h-6 text-primary mb-4" />
                <p className="display-copy text-xl mb-2">Prevenção e cuidado</p>
                <p className="text-base text-on-surface-variant font-medium leading-relaxed">
                  Experiência que reforça a importância de orientação, preparo e resposta responsável em situações de risco.
                </p>
              </div>
              <div className="border border-hairline rounded-2xl p-5 bg-surface">
                <Shield className="w-6 h-6 text-primary mb-4" />
                <p className="display-copy text-xl mb-2">Representação</p>
                <p className="text-base text-on-surface-variant font-medium leading-relaxed">
                  Defesa de profissionais de diferentes áreas que sustentam o serviço público e a rotina das famílias em Roraima.
                </p>
              </div>
            </div>
            <button
              onClick={() => scrollToSection("contato")}
              className="bg-primary text-on-primary px-8 md:px-16 py-5 md:py-6 font-black tracking-[0.1em] md:tracking-[0.18em] text-[11px] uppercase hover:bg-on-surface hover:text-surface transition-all shadow-2xl flex items-center justify-center gap-4 md:gap-6 rounded-full w-full sm:w-auto"
              type="button"
            >
              Quero ajudar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
