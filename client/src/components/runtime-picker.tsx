import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useStoryOverview } from '@/state/storyOverview';

const RuntimePicker = () => {
  const [customValue, setCustomValue] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const { overview, setField } = useStoryOverview();

  const predefinedOptions = [
    "60 mins",
    "87 mins", 
    "90 mins",
    "120 mins",
    "150 mins",
    "180 mins"
  ];

  const handleValueChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true);
      setField('runtime', customValue);
    } else {
      setIsCustom(false);
      setCustomValue("");
      setField('runtime', value);
    }
  };

  const handleCustomInput = (value: string) => {
    setCustomValue(value);
    setField('runtime', value);
  };

  if (isCustom) {
    return (
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter custom runtime..."
          className="bg-slate-600 border-slate-500 text-white placeholder:text-slate-400 flex-1"
          value={customValue}
          onChange={(e) => handleCustomInput(e.target.value)}
        />
        <Select onValueChange={() => setIsCustom(false)}>
          <SelectTrigger className="bg-slate-600 border-slate-500 text-white w-20">
            <SelectValue placeholder="Back" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="back">Back</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <Select value={overview.runtime || ""} onValueChange={handleValueChange}>
      <SelectTrigger className="bg-slate-600 border-slate-500 text-white">
        <SelectValue placeholder="Select Runtime" />
      </SelectTrigger>
      <SelectContent>
        {predefinedOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
        <SelectItem value="custom">Custom</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RuntimePicker;