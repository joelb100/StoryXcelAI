import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import BuilderWorkspace from "@/pages/builder-workspace";
import DashboardLayout from "@/pages/dashboard-layout";

function AuthenticatedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && location === '/') {
      // Show landing page for unauthenticated users
      return;
    }
    if (!isLoading && isAuthenticated && location === '/') {
      // Redirect authenticated users from root to dashboard
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, location, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (!isAuthenticated && location === '/') {
    return <Landing />;
  }

  if (isAuthenticated && location === '/') {
    return null; // Will redirect to dashboard
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Landing} />
      <Route path="/dashboard" component={DashboardLayout} />
      <Route path="/builder/:type" component={DashboardLayout} />
      <Route path="/builder" component={DashboardLayout} />
      <Route path="/" component={() => <AuthenticatedRoute component={Landing} />} />
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
