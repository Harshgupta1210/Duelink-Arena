import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { leaderboard } from "@/lib/data";

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">See who's at the top of their game.</p>
      </div>
      <LeaderboardTable entries={leaderboard} />
    </div>
  );
}
