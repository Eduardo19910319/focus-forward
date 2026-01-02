import { ProgressRing } from "./ProgressRing";

interface QuarterHeaderProps {
  quarter: string;
  week: number;
  totalWeeks: number;
  overallProgress: number;
  userName: string;
}

export function QuarterHeader({
  quarter,
  week,
  totalWeeks,
  overallProgress,
  userName,
}: QuarterHeaderProps) {
  const greeting = getGreeting();

  return (
    <header className="pt-safe-area-inset-top px-6 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">
            {quarter} · Semana {week} de {totalWeeks}
          </p>
          <h1 className="text-2xl font-bold text-foreground mt-1">
            {greeting}, {userName}
          </h1>
        </div>
        <ProgressRing
          progress={overallProgress}
          size={64}
          strokeWidth={5}
          showLabel={true}
        />
      </div>
    </header>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}
