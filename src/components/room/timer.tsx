"use client";

import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

export function Timer({ duration, currentTime }: { duration: number, currentTime: number }) {
  const progress = (currentTime / duration) * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <Clock className="w-8 h-8 text-muted-foreground" />
        <span className="absolute -top-2 -right-3 text-lg font-bold font-mono bg-background px-1">
          {currentTime}
        </span>
      </div>
      <Progress value={progress} className="w-full h-2" />
    </div>
  );
}
