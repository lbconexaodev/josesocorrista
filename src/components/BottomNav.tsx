import type { ScrollToSection } from "../App";
import { navItems } from "../data/navigation";

type BottomNavProps = {
  scrollToSection: ScrollToSection;
};

export function BottomNav({ scrollToSection }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface/95 backdrop-blur-md border-t border-hairline pb-safe pt-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-1 px-1.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="flex min-w-0 flex-col items-center justify-center rounded-xl py-2.5 px-1 transition-all text-on-surface-variant hover:bg-primary hover:text-on-primary active:scale-95"
            type="button"
          >
            <item.icon className="w-5 h-5 mb-1.5" />
            <span className="max-w-full truncate text-[10px] font-black uppercase tracking-normal">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
