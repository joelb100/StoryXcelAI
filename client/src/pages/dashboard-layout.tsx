import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Temporary simple version to test basic functionality
function DashboardLayout() {
  const [location, navigate] = useLocation();

  return (
    <div className="h-screen bg-slate-800 flex flex-col overflow-hidden">
      <header className="border-b border-slate-700 h-16 flex items-center justify-center" style={{ backgroundColor: '#0d274c' }}>
        <h1 className="text-white text-lg font-semibold">StoryXcel Dashboard</h1>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Dashboard Loading...</h2>
          <p>Application is initializing</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;