import { MatchHistory } from "@/components/results/match-history";
import { matches, currentUser } from "@/lib/data";

export default function ResultsPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Match History</h1>
        <p className="text-muted-foreground">Review your past duels.</p>
      </div>
      <MatchHistory matches={matches} currentUserId={currentUser.id} />
    </div>
  );
}
