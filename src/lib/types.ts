export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  onlineStatus: 'online' | 'idle' | 'offline';
};

export type InviteStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export type Invite = {
  id: string;
  fromUser: User;
  toUser: User;
  status: InviteStatus;
  timestamp: string;
};

export type LeaderboardEntry = {
  rank: number;
  user: User;
  wins: number;
  losses: number;
  draws: number;
  winRate: number;
};

export type Answer = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  questionText: string;
  answers: Answer[];
  correctAnswerId: string;
  timeLimit: number; // in seconds
};

export type MatchParticipant = {
  user: User;
  score: number;
};

export type Match = {
  id: string;
  participants: [MatchParticipant, MatchParticipant];
  status: 'pending' | 'active' | 'finished';
  questions: Question[];
  winnerId?: string | null; // null for a draw
  startedAt: string;
  endedAt?: string;
};
