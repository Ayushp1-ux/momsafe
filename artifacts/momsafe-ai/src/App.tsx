import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layout
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import Dashboard from "@/pages/dashboard";
import Vitals from "@/pages/vitals";
import Alerts from "@/pages/alerts";
import Analytics from "@/pages/analytics";
import AIGuidance from "@/pages/ai-guidance";
import Nutrition from "@/pages/nutrition";
import Medication from "@/pages/medication";
import DailyLogs from "@/pages/daily-logs";
import Predictions from "@/pages/predictions";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/vitals" component={Vitals} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/ai-guidance" component={AIGuidance} />
        <Route path="/nutrition" component={Nutrition} />
        <Route path="/medication" component={Medication} />
        <Route path="/daily-logs" component={DailyLogs} />
        <Route path="/predictions" component={Predictions} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
