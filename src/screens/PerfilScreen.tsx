import { motion } from "framer-motion";
import { User, Settings, Bell, Moon, ChevronRight, LogOut, Heart, History, Shield } from "lucide-react";

export function PerfilScreen() {
  const menuItems = [
    { icon: Bell, label: "Notificações", description: "Lembretes e alertas" },
    { icon: Heart, label: "Parceiro(a)", description: "Gerenciar conexão" },
    { icon: History, label: "Histórico", description: "Reuniões anteriores" },
    { icon: Shield, label: "Privacidade", description: "Dados e segurança" },
    { icon: Moon, label: "Aparência", description: "Tema do app" },
    { icon: Settings, label: "Configurações", description: "Preferências gerais" },
  ];

  const stats = [
    { value: "4", label: "Reuniões" },
    { value: "87%", label: "Aderência" },
    { value: "142", label: "Dias ativos" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="pt-12 px-6 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl gradient-indigo flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edu</h1>
            <p className="text-muted-foreground">Desde Janeiro 2026</p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="px-4 mb-6">
        <div className="focus-card">
          <div className="grid grid-cols-3 divide-x divide-border">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center py-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu */}
      <motion.div
        className="px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="focus-card divide-y divide-border">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                variants={itemVariants}
                className="w-full flex items-center gap-4 py-4 first:pt-0 last:pb-0 hover:bg-secondary/50 -mx-5 px-5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            );
          })}
        </div>

        {/* Logout */}
        <motion.button
          variants={itemVariants}
          className="w-full mt-4 focus-card flex items-center gap-4 text-destructive"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="font-medium">Sair da Conta</span>
        </motion.button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Focus First v1.0.0
        </p>
      </motion.div>
    </div>
  );
}
