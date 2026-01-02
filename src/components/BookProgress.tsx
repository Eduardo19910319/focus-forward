import { Book } from "lucide-react";
import { motion } from "framer-motion";

interface BookProgressProps {
  currentBook: string;
  currentPage: number;
  totalPages: number;
  booksRead: number;
  booksGoal: number;
}

export function BookProgress({
  currentBook,
  currentPage,
  totalPages,
  booksRead,
  booksGoal,
}: BookProgressProps) {
  const bookProgress = (currentPage / totalPages) * 100;
  const yearProgress = (booksRead / booksGoal) * 100;

  return (
    <div className="focus-card">
      <div className="flex items-start gap-4">
        {/* Book icon */}
        <div className="w-12 h-16 bg-primary-muted rounded-lg flex items-center justify-center">
          <Book className="w-6 h-6 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">Leitura Atual</p>
          <h3 className="font-semibold text-foreground truncate">{currentBook}</h3>
          
          {/* Progress bar */}
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Pág {currentPage}/{totalPages}</span>
              <span>{Math.round(bookProgress)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${bookProgress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Year goal */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Meta anual</span>
          <span className="text-sm font-medium text-foreground">
            {booksRead}/{booksGoal} livros
          </span>
        </div>
        <div className="mt-2 flex gap-1.5">
          {Array.from({ length: booksGoal }).map((_, i) => (
            <motion.div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < booksRead ? "bg-success" : "bg-secondary"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
