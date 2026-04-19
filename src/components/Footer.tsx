import { useRef } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import type { ScrollToSection } from "../App";
import { images } from "../data/images";

const baseUrl = import.meta.env.BASE_URL;

type FooterProps = {
  scrollToSection: ScrollToSection;
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/jose_socorrista?igsh=dWV4ZzE0aHJ1bzhn",
    label: "Instagram",
  },
  { icon: Twitter, href: "https://x.com", label: "X" },
];

const footerLinks = [
  { label: "Portfólio", target: "portfolio" },
  { label: "Propostas", target: "propostas" },
  { label: "Contato", target: "contato" },
  { label: "Doação", target: "doacao" },
];

export function Footer({ scrollToSection }: FooterProps) {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const videoY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <footer
      ref={footerRef}
      className="bg-surface-container border-t border-hairline py-20 md:py-28 relative overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none opacity-[0.035] select-none">
        <span className="display-copy absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[24vw] font-black text-on-surface whitespace-nowrap uppercase">
          Boa Vista
        </span>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 text-on-surface">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-12 md:gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <img
                src={images.logo}
                alt="José Socorrista"
                className="w-16 h-16 object-cover rounded-full border border-primary/30 shadow-lg"
              />
              <div>
                <div className="display-copy text-4xl text-on-surface leading-none">
                  José Socorrista
                </div>
                <div className="label text-primary uppercase mt-2 font-black">
                  Pré-candidato a vereador por Boa Vista
                </div>
              </div>
            </div>

            <p className="text-on-surface-variant max-w-lg leading-relaxed border-l-4 border-primary pl-6 text-base font-medium">
              Quem conhece a urgência sabe que cuidado público precisa de presença,
              preparo e resposta rápida.
            </p>

            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 bg-surface border border-hairline rounded-full text-on-surface-variant hover:text-primary hover:border-primary transition-all shadow-sm hover:shadow-md"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="label text-primary uppercase font-black">Navegação</p>
              <div className="flex flex-col gap-4 font-black tracking-[0.1em] text-xs uppercase">
                {footerLinks.map((link) => (
                  <button
                    key={link.target}
                    onClick={() => scrollToSection(link.target)}
                    className="text-left text-on-surface-variant hover:text-primary transition-colors"
                    type="button"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="label text-primary uppercase font-black">Campanha</p>
              <div className="flex flex-col gap-4 font-black tracking-[0.1em] text-xs uppercase text-on-surface-variant">
                <a href="#propostas" className="hover:text-primary transition-colors">Transparência</a>
                <a href="#contato" className="hover:text-primary transition-colors">Voluntariado</a>
                <a
                  href="https://www.instagram.com/jose_socorrista?igsh=dWV4ZzE0aHJ1bzhn"
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-hairline bg-[#02070a] text-white shadow-2xl">
            <motion.video
              style={{ y: videoY }}
              className="absolute inset-0 h-[120%] w-full object-cover opacity-70"
              src={`${baseUrl}videos/logo-lb-conexao-dev-explosao.mp4`}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/85" />
            <div className="relative z-10 grid min-h-[210px] grid-cols-1 items-center gap-6 px-6 py-8 text-center md:grid-cols-[1fr_auto_1fr] md:px-12">
              <div className="space-y-2 md:text-right">
                <p className="label text-primary uppercase font-black">Plataforma desenvolvida por</p>
                <p className="text-lg font-black text-white">Lucivaldo Oliveira Barroso</p>
              </div>

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-white shadow-xl">
                <img
                  src={`${baseUrl}img/logo-dev.png`}
                  alt="LB Conexão Dev"
                  className="h-20 w-20 rounded-xl object-contain"
                />
              </div>

              <div className="space-y-2 md:text-left">
                <p className="display-copy text-3xl leading-none text-white">LB Conexão Dev</p>
                <p className="label text-white/85 uppercase font-black">Tecnologia e Soluções Digitais</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-hairline flex flex-col md:flex-row justify-between items-center gap-6 uppercase font-bold text-on-surface-variant">
          <div className="text-xs tracking-[0.12em] text-center md:text-left">
            2026 Todos os Direitos Reservados.
          </div>
          <div className="flex gap-8 md:gap-12 text-xs font-black tracking-[0.12em] text-primary">
            <span>#JoseSocorrista</span>
            <span className="text-secondary">#BoaVista</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
