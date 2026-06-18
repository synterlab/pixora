import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Intro from "@/pages/Intro";
import WorldMap from "@/pages/WorldMap";
import Challenge from "@/pages/Challenge";
import Collection from "@/pages/Collection";
import PixoScreen from "@/pages/PixoScreen";
import ParentSummary from "@/pages/ParentSummary";
import { GameProvider } from "@/store/gameStore";
import { AuthProvider } from "@/store/authStore";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Intro} />
      <Route path="/map" component={WorldMap} />
      <Route path="/world/:id" component={Challenge} />
      <Route path="/collection" component={Collection} />
      <Route path="/pixo" component={PixoScreen} />
      <Route path="/parent" component={ParentSummary} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
