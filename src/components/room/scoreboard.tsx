"use client";

import type { MatchParticipant } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Scoreboard({ user, isOpponent = false }: { user: MatchParticipant, isOpponent?: boolean }) {
  return (
    <Card className={cn("p-2", isOpponent && "text-right")}>
      <div className={cn("flex items-center gap-3", isOpponent && "flex-row-reverse")}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.user.avatarUrl} alt={user.user.name} />
          <AvatarFallback>{user.user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold truncate">{user.user.name}</p>
          <p className="text-2xl font-bold font-mono text-primary">{user.score}</p>
        </div>
      </div>
    </Card>
  );
}
