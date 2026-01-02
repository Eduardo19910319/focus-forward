import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, Lock, Eye, Handshake, Sparkles, ArrowRight, Check } from "lucide-react";
import confetti from "canvas-confetti";

type RitualState = "collect" | "review" | "reveal" | "plan" | "signed";

interface Feedback {
  id: string;
  date: string;
  text: string;
}

export function RitualScreen() {
  const [state, setState] = useState<RitualState>("collect");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    { id: "1", date: "15/01", text: "Edu mandou muito bem cuidando das crianças no sábado!" },
    { id: "2", date: "22/01", text: "Achei que ficou muito no celular durante o jantar essa semana." },
  ]);
  const [newFeedback, setNewFeedback] = useState("");
  const [revealedCard, setRevealedCard] = useState(false);
  const [actionPlan, setActionPlan] = useState("");

  // Simulating meeting day
  const isMeetingDay = false; // Set to true to test meeting flow

  const addFeedback = () => {
    if (newFeedback.trim()) {
      setFeedbacks([
        ...feedbacks,
        {
          id: Date.now().toString(),
          date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
          text: newFeedback,
        },
      ]);
      setNewFeedback("");
    }
  };

  const handleSign = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#4f46e5", "#9333ea", "#22c55e", "#f59e0b"],
    });
    setState("signed");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="pt-12 px-6 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Ritual</h1>
        <p className="text-muted-foreground mt-1">
          {state === "collect" ? "Reunião trimestral em 45 dias" : "Modo Reunião Ativo"}
        </p>
      </header>

      <motion.div
        className="px-4 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* State: Collecting Feedback */}
        {state === "collect" && (
          <>
            <motion.div variants={itemVariants} className="focus-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center">
                  <MessageSquarePlus className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Anotar Feedback</h3>
                  <p className="text-sm text-muted-foreground">Para seu parceiro(a)</p>
                </div>
              </div>

              <textarea
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="O que você gostaria de destacar sobre essa semana?"
                className="w-full h-24 bg-secondary rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <button
                onClick={addFeedback}
                disabled={!newFeedback.trim()}
                className="mt-4 w-full py-3 bg-accent text-accent-foreground font-medium rounded-xl transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar Feedback
              </button>
            </motion.div>

            {/* Saved feedbacks */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Guardados ({feedbacks.length})
                </h2>
              </div>

              <div className="space-y-2">
                {feedbacks.map((feedback) => (
                  <motion.div
                    key={feedback.id}
                    className="focus-card !p-4 flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{feedback.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{feedback.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Demo: Start Meeting */}
            <motion.div variants={itemVariants}>
              <button
                onClick={() => setState("review")}
                className="w-full py-4 border-2 border-dashed border-accent/30 rounded-xl text-accent font-medium flex items-center justify-center gap-2 hover:bg-accent-muted transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Iniciar Reunião (Demo)
              </button>
            </motion.div>
          </>
        )}

        {/* State: Review (Meeting Step 1) */}
        {state === "review" && (
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="focus-card text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-primary-muted mx-auto flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">O Raio-X</h2>
              <p className="text-muted-foreground">Seu desempenho neste trimestre</p>
            </div>

            <div className="focus-card">
              <h3 className="font-semibold text-foreground mb-4">Resumo Q1 2026</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success-muted rounded-xl">
                  <span className="text-sm text-foreground">SQL/Python</span>
                  <span className="font-semibold text-success">80% dos dias</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning-muted rounded-xl">
                  <span className="text-sm text-foreground">Livros lidos</span>
                  <span className="font-semibold text-warning">1/3 meta</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success-muted rounded-xl">
                  <span className="text-sm text-foreground">Francês</span>
                  <span className="font-semibold text-success">65% dos dias</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                  <span className="text-sm text-foreground">Uso de celular</span>
                  <span className="font-semibold text-foreground">Média 2h45m/dia</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setState("reveal")}
              className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-xl flex items-center justify-center gap-2"
            >
              Próximo: Ver Feedback
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* State: Reveal (Meeting Step 2) */}
        {state === "reveal" && (
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="focus-card text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-accent-muted mx-auto flex items-center justify-center mb-4">
                <MessageSquarePlus className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">A Revelação</h2>
              <p className="text-muted-foreground">Feedback da sua parceira</p>
            </div>

            {/* Flip Card */}
            <div 
              className="focus-card cursor-pointer overflow-hidden"
              onClick={() => setRevealedCard(true)}
            >
              <AnimatePresence mode="wait">
                {!revealedCard ? (
                  <motion.div
                    key="front"
                    className="py-12 text-center"
                    initial={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Lock className="w-12 h-12 text-accent mx-auto mb-4" />
                    <p className="text-muted-foreground">Toque para revelar</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    className="space-y-4"
                    initial={{ rotateY: -90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 bg-success-muted rounded-xl">
                      <p className="text-sm font-medium text-success mb-1">✨ Pontos fortes</p>
                      <p className="text-foreground">Muito presente com as crianças nos fins de semana. Manteve consistência no estudo mesmo com rotina corrida.</p>
                    </div>
                    <div className="p-4 bg-warning-muted rounded-xl">
                      <p className="text-sm font-medium text-warning mb-1">🎯 A melhorar</p>
                      <p className="text-foreground">Reduzir tempo no celular durante refeições. Mais proativo nas tarefas de casa.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {revealedCard && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setState("plan")}
                className="w-full py-4 bg-accent text-accent-foreground font-medium rounded-xl flex items-center justify-center gap-2"
              >
                Próximo: Plano de Ação
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        )}

        {/* State: Plan (Meeting Step 3) */}
        {state === "plan" && (
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="focus-card text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-success-muted mx-auto flex items-center justify-center mb-4">
                <Handshake className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">O Compromisso</h2>
              <p className="text-muted-foreground">O que muda para o próximo trimestre?</p>
            </div>

            <div className="focus-card">
              <label className="text-sm font-medium text-foreground block mb-2">
                Plano de Ação
              </label>
              <textarea
                value={actionPlan}
                onChange={(e) => setActionPlan(e.target.value)}
                placeholder="Baseado no feedback, o que vocês concordaram em mudar?"
                className="w-full h-32 bg-secondary rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-success"
              />
            </div>

            <button
              onClick={handleSign}
              disabled={!actionPlan.trim()}
              className="w-full py-4 gradient-success text-success-foreground font-medium rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
              Aceitar Pacto
            </button>
          </motion.div>
        )}

        {/* State: Signed */}
        {state === "signed" && (
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-success mx-auto flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <Check className="w-12 h-12 text-success-foreground" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Pacto Selado! 🎉</h2>
            <p className="text-muted-foreground mb-8">Q2 2026 está liberado</p>
            
            <button
              onClick={() => {
                setState("collect");
                setRevealedCard(false);
                setActionPlan("");
              }}
              className="px-6 py-3 bg-secondary text-foreground font-medium rounded-xl"
            >
              Voltar ao Início
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
