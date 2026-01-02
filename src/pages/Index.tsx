import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { HojeScreen } from "@/screens/HojeScreen";
import { VisaoScreen } from "@/screens/VisaoScreen";
import { RitualScreen } from "@/screens/RitualScreen";
import { PerfilScreen } from "@/screens/PerfilScreen";

type TabType = "hoje" | "visao" | "ritual" | "perfil";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("hoje");

  const renderScreen = () => {
    switch (activeTab) {
      case "hoje":
        return <HojeScreen />;
      case "visao":
        return <VisaoScreen />;
      case "ritual":
        return <RitualScreen />;
      case "perfil":
        return <PerfilScreen />;
      default:
        return <HojeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
