import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import BuilderWorkspace from "@/pages/builder-workspace";
import DashboardLayout from "@/pages/dashboard-layout";

function Router() {
  // Start on login page
  return (
    <Switch>
      <Route path="/login" component={Landing} />
      <Route path="/dashboard" component={DashboardLayout} />
      <Route path="/builder/:type" component={DashboardLayout} />
      <Route path="/builder" component={DashboardLayout} />
      <Route path="/" component={Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
