import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DefinitionTooltipProps {
  children: ReactNode;
  term: string;
  definition: string;
  side?: "top" | "right" | "bottom" | "left";
}

export function DefinitionTooltip({ 
  children, 
  term, 
  definition, 
  side = "right" 
}: DefinitionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          className="max-w-xs bg-slate-800 border-slate-600 text-white p-3 rounded-lg shadow-lg"
        >
          <div className="space-y-1">
            <div className="font-semibold text-amber-400">{term}</div>
            <div className="text-sm text-slate-200 leading-relaxed">
              {definition}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}