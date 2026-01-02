import { useState } from "react";
import { motion } from "framer-motion";
import { QuarterHeader } from "@/components/QuarterHeader";
import { HabitItem } from "@/components/HabitItem";
import { BookProgress } from "@/components/BookProgress";
import { TimeTracker } from "@/components/TimeTracker";
import { StreakCalendar } from "@/components/StreakCalendar";
import { Heart, Dumbbell } from "lucide-react";

interface Habit {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
  variant: "primary" | "accent";
}

// Generate streak data for the last 21 days
const generateStreakData = () => {
  const days = [];
  const today = new Date();
  for (let i = 20; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const random = Math.random();
    let status: "completed" | "missed" | "pending";
    if (i === 0) {
      status = "pending";
    } else if (random > 0.2) {
      status = "completed";
    } else {
      status = "missed";
    }
    days.push({
      date: date.toLocaleDateString("pt-BR"),
      status,
    });
  }
  return days;
};

export function HojeScreen() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", title: "Estudar Python/SQL", subtitle: "30min", completed: false, variant: "primary" },
    { id: "2", title: "Francês", subtitle: "Duolingo/Aula", completed: true, variant: "primary" },
  ]);

  const [coupleHabits, setCoupleHabits] = useState<Habit[]>([
    { id: "3", title: "Treino Academia", subtitle: "Juntos", completed: false, variant: "accent" },
  ]);

  const streakData = generateStreakData();
  const completedToday = habits.filter(h => h.completed).length + coupleHabits.filter(h => h.completed).length;
  const totalToday = habits.length + coupleHabits.length + 1; // +1 for time tracker
  const progress = Math.round((completedToday / totalToday) * 100);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const toggleCoupleHabit = (id: string) => {
    setCoupleHabits(coupleHabits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <QuarterHeader
        quarter="Q1 2026"
        week={4}
        totalWeeks={12}
        overallProgress={progress}
        userName="Edu"
      />

      <motion.div
        className="px-4 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Priority Focus */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Foco do Dia
            </h2>
            <span className="ml-auto text-sm text-muted-foreground">
              {habits.filter(h => h.completed).length}/{habits.length}
            </span>
          </div>
          <div className="focus-card space-y-1">
            {habits.map((habit) => (
              <HabitItem
                key={habit.id}
                {...habit}
                onToggle={toggleHabit}
              />
            ))}
          </div>
        </motion.div>

        {/* Reading Progress */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-2 h-2 rounded-full bg-success" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Leitura
            </h2>
          </div>
          <BookProgress
            currentBook="Hábitos Atômicos"
            currentPage={120}
            totalPages={300}
            booksRead={2}
            booksGoal={12}
          />
        </motion.div>

        {/* Screen Time Tracker */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Comportamento
            </h2>
          </div>
          <TimeTracker
            question="Como foi o uso do celular hoje?"
            goalHours={3}
            onSubmit={(h, m) => console.log(`Registered: ${h}h ${m}m`)}
          />
        </motion.div>

        {/* Couple Tasks */}
        {coupleHabits.length > 0 && (
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <Heart className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Casal
              </h2>
            </div>
            <div className="focus-card border-accent/20 space-y-1">
              {coupleHabits.map((habit) => (
                <HabitItem
                  key={habit.id}
                  {...habit}
                  onToggle={toggleCoupleHabit}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Streak */}
        <motion.div variants={itemVariants}>
          <StreakCalendar days={streakData} title="Sequência SQL/Python" />
        </motion.div>
      </motion.div>
    </div>
  );
}
