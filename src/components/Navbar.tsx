import { Moon, Sun } from "lucide-react";
import type { ScrollToSection } from "../App";
import { images } from "../data/images";
import { navItems } from "../data/navigation";

type NavbarProps = {
  scrollToSection: ScrollToSection;
  isDark: boolean;
  toggleDark: () => void;
};

export function Navbar({ scrollToSection, isDark, toggleDark }: NavbarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-hairline transition-all duration-500">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 md:py-5 max-w-7xl mx-auto w-full gap-4">
        <button
          className="flex items-center gap-3 text-left group min-w-0"
          onClick={() => scrollToSection("portfolio")}
          type="button"
        >
          <img
            src={images.logo}
            alt="José Socorrista"
            className="w-10 h-10 object-cover rounded-full border border-primary/30 group-hover:border-primary transition-all"
          />
          <span className="display-copy text-xl md:text-2xl text-on-surface group-hover:text-primary transition-all truncate">
            José Socorrista
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-2 rounded-full border border-hairline bg-surface-container/90 p-1.5 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-on-surface-variant transition-all hover:bg-primary hover:text-on-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              type="button"
            >
              <item.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-6">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full hover:bg-surface-container transition-all text-on-surface"
            aria-label="Alternar tema"
            type="button"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => scrollToSection("doacao")}
            className="border border-primary text-primary hover:bg-primary hover:text-on-primary font-black px-5 md:px-8 py-3 transition-all active:scale-95 text-[11px] tracking-[0.16em] uppercase rounded-full"
            type="button"
          >
            Doar
          </button>
        </div>
      </div>
    </header>
  );
}
