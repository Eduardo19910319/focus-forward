import { useState } from "react";
import { Smartphone, Check } from "lucide-react";
import { motion } from "framer-motion";

interface TimeTrackerProps {
  question: string;
  goalHours: number;
  onSubmit: (hours: number, minutes: number) => void;
}

export function TimeTracker({ question, goalHours, onSubmit }: TimeTrackerProps) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const totalMinutes = hours * 60 + minutes;
  const goalMinutes = goalHours * 60;
  const isUnderGoal = totalMinutes <= goalMinutes;

  const handleSubmit = () => {
    onSubmit(hours, minutes);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="focus-card"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isUnderGoal ? "bg-success-muted text-success" : "bg-warning-muted text-warning"
          }`}>
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              {hours}h {minutes}min registrado
            </p>
            <p className={`text-sm ${isUnderGoal ? "text-success" : "text-warning"}`}>
              {isUnderGoal ? "Dentro da meta! 🎉" : "Acima da meta"}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="focus-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-warning-muted flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-warning" />
        </div>
        <p className="font-medium text-foreground">{question}</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <label className="text-xs text-muted-foreground mb-1 block">Horas</label>
          <input
            type="number"
            min="0"
            max="24"
            value={hours}
            onChange={(e) => setHours(Math.min(24, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full h-12 bg-secondary rounded-xl text-center text-xl font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <span className="text-2xl text-muted-foreground mt-5">:</span>
        <div className="flex-1">
          <label className="text-xs text-muted-foreground mb-1 block">Minutos</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full h-12 bg-secondary rounded-xl text-center text-xl font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-foreground text-background font-medium rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
      >
        Registrar
      </button>
    </div>
  );
}
