import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock } from "lucide-react";
import confetti from "canvas-confetti";

interface HabitItemProps {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
  variant?: "primary" | "accent";
  onToggle: (id: string) => void;
}

export function HabitItem({
  id,
  title,
  subtitle,
  completed,
  variant = "primary",
  onToggle,
}: HabitItemProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!completed) {
      setIsAnimating(true);
      // Subtle confetti
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: variant === "primary" 
          ? ["#4f46e5", "#6366f1", "#818cf8"] 
          : ["#9333ea", "#a855f7", "#c084fc"],
        scalar: 0.7,
        gravity: 1.2,
        ticks: 100,
      });
      setTimeout(() => setIsAnimating(false), 300);
    }
    onToggle(id);
  };

  const variantStyles = {
    primary: {
      check: "bg-primary text-primary-foreground",
      border: "border-primary",
      unchecked: "border-muted-foreground/30",
    },
    accent: {
      check: "bg-accent text-accent-foreground",
      border: "border-accent",
      unchecked: "border-muted-foreground/30",
    },
  };

  return (
    <motion.div
      className="habit-item group cursor-pointer"
      onClick={handleToggle}
      whileTap={{ scale: 0.98 }}
    >
      {/* Checkbox */}
      <motion.div
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
          completed
            ? variantStyles[variant].check
            : variantStyles[variant].unchecked
        }`}
        animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
      >
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check className="w-4 h-4" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`font-medium transition-all duration-200 ${
            completed
              ? "text-muted-foreground line-through"
              : "text-foreground"
          }`}
        >
          {title}
        </p>
        {subtitle && (
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3" />
            {subtitle}
          </p>
        )}
      </div>

      {/* Status indicator */}
      {!completed && (
        <div className={`w-2 h-2 rounded-full ${
          variant === "primary" ? "bg-primary/50" : "bg-accent/50"
        }`} />
      )}
    </motion.div>
  );
}
