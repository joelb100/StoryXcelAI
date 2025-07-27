import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import BuilderWorkspace from "@/pages/builder-workspace";

function Router() {
  // Skip authentication for now - go directly to dashboard
  return (
    <Switch>
      <Route path="/login" component={Landing} />
      <Route path="/" component={Dashboard} />
      <Route path="/builder/:type" component={BuilderWorkspace} />
      <Route path="/builder" component={BuilderWorkspace} />
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
