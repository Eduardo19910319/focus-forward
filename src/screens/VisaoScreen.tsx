import { useState } from "react";
import { motion } from "framer-motion";
import { ProgressRing } from "@/components/ProgressRing";
import { CoupleGoalCard } from "@/components/CoupleGoalCard";
import { Book, Code, Briefcase, TrendingUp, ChevronRight } from "lucide-react";

type TabType = "edu" | "casal";

interface Project {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
}

export function VisaoScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("edu");

  const projects: Project[] = [
    { id: "1", title: "Tirar projeto X do papel", status: "in_progress" },
    { id: "2", title: "Certificação AWS", status: "todo" },
    { id: "3", title: "Curso de Liderança", status: "done" },
  ];

  const badges = [
    { id: "1", icon: "stadium" as const, label: "Arena", unlocked: false },
    { id: "2", icon: "moto" as const, label: "Viagem Moto", unlocked: false },
    { id: "3", icon: "travel" as const, label: "Internacional", unlocked: false },
  ];

  const statusColors = {
    todo: "bg-muted text-muted-foreground",
    in_progress: "bg-warning-muted text-warning",
    done: "bg-success-muted text-success",
  };

  const statusLabels = {
    todo: "A fazer",
    in_progress: "Em andamento",
    done: "Concluído",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="pt-12 px-6 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Visão</h1>
        <p className="text-muted-foreground mt-1">Seu painel de controle</p>
      </header>

      {/* Tab Switcher */}
      <div className="px-4 mb-6">
        <div className="bg-secondary rounded-2xl p-1 flex">
          <button
            onClick={() => setActiveTab("edu")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "edu"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Edu
          </button>
          <button
            onClick={() => setActiveTab("casal")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "casal"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            Casal
          </button>
        </div>
      </div>

      {activeTab === "edu" ? (
        <motion.div
          className="px-4 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key="edu"
        >
          {/* Reading Block */}
          <motion.div variants={itemVariants} className="focus-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Leitura</h3>
                <p className="text-sm text-muted-foreground">Meta: 12 livros/ano</p>
              </div>
              <ProgressRing progress={17} size={48} strokeWidth={4} showLabel={false} />
            </div>
            
            {/* Book slots */}
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`aspect-[2/3] rounded-lg ${
                    i < 2 ? "bg-success" : "bg-secondary"
                  } flex items-center justify-center`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  {i < 2 && <Book className="w-4 h-4 text-success-foreground" />}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Projects Block */}
          <motion.div variants={itemVariants} className="focus-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Projetos</h3>
            </div>

            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl"
                >
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[project.status]}`}>
                    {statusLabels[project.status]}
                  </div>
                  <span className="flex-1 text-sm text-foreground">{project.title}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Block */}
          <motion.div variants={itemVariants} className="focus-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-muted flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Hard Skills</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <ProgressRing progress={80} size={80} strokeWidth={6} />
                <p className="mt-2 text-sm font-medium text-foreground">SQL/Python</p>
                <p className="text-xs text-muted-foreground">24/30 dias</p>
              </div>
              <div className="text-center">
                <ProgressRing progress={65} size={80} strokeWidth={6} />
                <p className="mt-2 text-sm font-medium text-foreground">Francês</p>
                <p className="text-xs text-muted-foreground">20/30 dias</p>
              </div>
            </div>
          </motion.div>

          {/* Behavior Trends */}
          <motion.div variants={itemVariants} className="focus-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-success-muted flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Soft Skills</h3>
                <p className="text-sm text-muted-foreground">Tendência semanal</p>
              </div>
            </div>

            {/* Simple trend visualization */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Paciência</span>
                  <span className="text-success font-medium">↑ 15%</span>
                </div>
                <div className="flex gap-1">
                  {[60, 65, 55, 70, 75, 80, 85].map((value, i) => (
                    <div key={i} className="flex-1 bg-secondary rounded-full overflow-hidden h-8 flex items-end">
                      <motion.div
                        className="w-full bg-success rounded-full"
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="px-4 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key="casal"
        >
          {/* Finances */}
          <motion.div variants={itemVariants} className="focus-card">
            <h3 className="font-semibold text-foreground mb-4">Saúde Financeira</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Limpar Nome</span>
                  <span className="text-success font-medium">75%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-success rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Fundo de Emergência</span>
                  <span className="text-warning font-medium">45%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-warning rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "45%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Couple Goals */}
          <motion.div variants={itemVariants}>
            <CoupleGoalCard
              fundProgress={35}
              fundLabel="Fundo Viagem de Moto"
              badges={badges}
            />
          </motion.div>

          {/* Shared Activities */}
          <motion.div variants={itemVariants} className="focus-card border-accent/20">
            <h3 className="font-semibold text-foreground mb-4">Atividades Compartilhadas</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-accent-muted rounded-xl">
                <p className="text-3xl font-bold text-accent">12</p>
                <p className="text-sm text-muted-foreground">Treinos juntos</p>
              </div>
              <div className="text-center p-4 bg-success-muted rounded-xl">
                <p className="text-3xl font-bold text-success">8</p>
                <p className="text-sm text-muted-foreground">Dates realizados</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
