import { motion } from "motion/react";
import type { ReactNode } from "react";

type FloatingDonateButtonProps = {
  icon: ReactNode;
  onClick: () => void;
};

export function FloatingDonateButton({ icon, onClick }: FloatingDonateButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 bg-primary text-on-primary p-4 shadow-2xl z-40 md:flex items-center gap-3 hidden border border-primary/20 rounded-full"
      type="button"
    >
      {icon}
      <span className="text-xs font-black tracking-[0.14em] uppercase">Contato</span>
    </motion.button>
  );
}
