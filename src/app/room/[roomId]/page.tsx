import { ChallengeRoom } from "@/components/room/challenge-room";
import { matches, questions, users } from "@/lib/data";

export default function RoomPage({ params }: { params: { roomId: string } }) {
  const matchData = matches.find(m => m.id === 'match1') || {
    id: params.roomId,
    participants: [
        { user: users[0], score: 0 },
        { user: users[1], score: 0 },
    ],
    status: 'active',
    questions: questions,
    startedAt: new Date().toISOString(),
  };

  return <ChallengeRoom match={matchData} />;
}
