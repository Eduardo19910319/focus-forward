import { motion } from "framer-motion";
import { Heart, Plane, Bike, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Badge {
  id: string;
  icon: "stadium" | "moto" | "travel";
  label: string;
  unlocked: boolean;
}

interface CoupleGoalCardProps {
  fundProgress: number;
  fundLabel: string;
  badges: Badge[];
}

const iconMap: Record<string, LucideIcon> = {
  stadium: MapPin,
  moto: Bike,
  travel: Plane,
};

export function CoupleGoalCard({ fundProgress, fundLabel, badges }: CoupleGoalCardProps) {
  return (
    <div className="focus-card border-accent/20 bg-gradient-to-br from-card to-accent-muted/30">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-accent" />
        <h3 className="font-semibold text-foreground">Metas do Casal</h3>
      </div>

      {/* Fund progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{fundLabel}</span>
          <span className="text-sm font-medium text-foreground">{fundProgress}%</span>
        </div>
        <div className="h-3 bg-accent/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-violet rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${fundProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-4 justify-center">
        {badges.map((badge, index) => {
          const Icon = iconMap[badge.icon] || MapPin;
          return (
            <motion.div
              key={badge.id}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  badge.unlocked
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-muted-foreground text-center">
                {badge.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
