"use client";

import type { Match } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Swords } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export function MatchHistory({ matches, currentUserId }: { matches: Match[], currentUserId: string }) {
  const { toast } = useToast();

  const handleShare = (matchId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/results/${matchId}`);
    toast({
      title: "Link Copied!",
      description: "Match result link has been copied to your clipboard.",
    });
  };

  const getResult = (match: Match) => {
    if (match.winnerId === null) return { text: "Draw", variant: "secondary" as const };
    if (match.winnerId === currentUserId) return { text: "Win", variant: "default" as const };
    return { text: "Loss", variant: "destructive" as const };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Matches</CardTitle>
        <CardDescription>A log of your most recent duels.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {matches.map((match) => {
          const opponent = match.participants.find(p => p.user.id !== currentUserId)?.user;
          const result = getResult(match);

          return (
            <div key={match.id} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg border bg-card/50">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <Badge variant={result.variant} className="text-xs w-14 justify-center">{result.text}</Badge>
                    <div className="flex items-center">
                        <Avatar className="h-10 w-10 z-10 border-2 border-background">
                            <AvatarImage src={match.participants[0].user.avatarUrl} />
                            <AvatarFallback>{match.participants[0].user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-10 w-10 -ml-4 border-2 border-background">
                            <AvatarImage src={match.participants[1].user.avatarUrl} />
                            <AvatarFallback>{match.participants[1].user.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <p className="font-semibold">
                            vs {opponent ? opponent.name : "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(match.endedAt!), { addSuffix: true })}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">{match.participants.find(p => p.user.id === currentUserId)?.score} - {match.participants.find(p => p.user.id !== currentUserId)?.score}</p>
                    <div className="flex gap-2">
                        <Link href={`/room/${match.id}?replay=true`} passHref>
                           <Button variant="outline" size="sm">
                               <Swords className="mr-2 h-4 w-4" />
                               Replay
                           </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => handleShare(match.id)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </div>
                </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  );
}
