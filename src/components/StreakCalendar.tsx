import { motion } from "framer-motion";

interface StreakDay {
  date: string;
  status: "completed" | "missed" | "pending";
}

interface StreakCalendarProps {
  days: StreakDay[];
  title: string;
}

export function StreakCalendar({ days, title }: StreakCalendarProps) {
  const currentStreak = days.filter((d, i) => {
    if (d.status !== "completed") return false;
    // Check if all previous days were completed
    for (let j = 0; j < i; j++) {
      if (days[j].status === "missed") return false;
    }
    return true;
  }).length;

  return (
    <div className="focus-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="text-sm text-success font-medium">
          🔥 {currentStreak} dias
        </span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {days.map((day, index) => (
          <motion.div
            key={day.date}
            className={`streak-dot ${day.status}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.03 }}
            title={`${day.date}: ${day.status}`}
          />
        ))}
      </div>
    </div>
  );
}
