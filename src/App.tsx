import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { BottomNav } from "./components/BottomNav";
import { FloatingDonateButton } from "./components/FloatingDonateButton";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ContactPage } from "./pages/ContactPage";
import { DonatePage } from "./pages/DonatePage";
import { HomePage } from "./pages/HomePage";
import { ProposalsPage } from "./pages/ProposalsPage";

export type ScrollToSection = (id: string) => void;

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const scrollToSection: ScrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans transition-colors duration-500 overflow-x-hidden">
      <Navbar
        scrollToSection={scrollToSection}
        isDark={isDark}
        toggleDark={() => setIsDark((value) => !value)}
      />

      <main className="flex-grow pt-24 pb-24 md:pb-12">
        <section id="portfolio">
          <HomePage scrollToSection={scrollToSection} />
        </section>

        <section id="propostas" className="pt-24 md:pt-32">
          <ProposalsPage scrollToSection={scrollToSection} />
        </section>

        <section id="contato" className="pt-24 md:pt-32">
          <ContactPage />
        </section>

        <section id="doacao" className="mt-24 md:mt-32">
          <DonatePage />
        </section>
      </main>

      <Footer scrollToSection={scrollToSection} />
      <BottomNav scrollToSection={scrollToSection} />
      <FloatingDonateButton
        icon={<MessageCircle className="w-5 h-5" />}
        onClick={() => scrollToSection("contato")}
      />
    </div>
  );
}
