import type { User, Invite, LeaderboardEntry, Match, Question } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getUserAvatar = (id: number) => PlaceHolderImages.find(img => img.id === `avatar-${id}`)?.imageUrl || PlaceHolderImages[0].imageUrl;

export const users: User[] = [
  { id: '1', name: 'Alex Ray', avatarUrl: getUserAvatar(1), onlineStatus: 'online' },
  { id: '2', name: 'Jordan Lee', avatarUrl: getUserAvatar(2), onlineStatus: 'online' },
  { id: '3', name: 'Casey Pat', avatarUrl: getUserAvatar(3), onlineStatus: 'idle' },
  { id: '4', name: 'Taylor B.', avatarUrl: getUserAvatar(4), onlineStatus: 'offline' },
  { id: '5', name: 'Morgan V.', avatarUrl: getUserAvatar(5), onlineStatus: 'online' },
  { id: '6', name: 'Jamie Lan', avatarUrl: getUserAvatar(6), onlineStatus: 'offline' },
  { id: '7', name: 'Riley P.', avatarUrl: getUserAvatar(7), onlineStatus: 'idle' },
  { id: '8', name: 'Cameron K.', avatarUrl: getUserAvatar(8), onlineStatus: 'online' },
  { id: '9', name: 'Drew N.', avatarUrl: getUserAvatar(9), onlineStatus: 'offline' },
  { id: '10', name: 'Skyler W.', avatarUrl: getUserAvatar(10), onlineStatus: 'online' },
];

export const currentUser: User = users[0];

export const classmates: User[] = users.slice(1);

export const invites: Invite[] = [
  {
    id: 'inv1',
    fromUser: users[1],
    toUser: currentUser,
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'inv2',
    fromUser: users[2],
    toUser: currentUser,
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: 'inv3',
    fromUser: currentUser,
    toUser: users[4],
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: 'inv4',
    fromUser: currentUser,
    toUser: users[7],
    status: 'rejected',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'inv5',
    fromUser: users[5],
    toUser: currentUser,
    status: 'accepted',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export const leaderboard: LeaderboardEntry[] = users.map((user, index) => ({
  rank: index + 1,
  user,
  wins: Math.floor(Math.random() * 50),
  losses: Math.floor(Math.random() * 20),
  draws: Math.floor(Math.random() * 10),
  winRate: Math.random(),
})).sort((a, b) => b.wins - a.wins).map((entry, index) => ({ ...entry, rank: index + 1 }));

export const questions: Question[] = [
    {
      id: 'q1',
      questionText: 'What is the capital of France?',
      answers: [
        { id: 'a1', text: 'Berlin' },
        { id: 'a2', text: 'Madrid' },
        { id: 'a3', text: 'Paris' },
        { id: 'a4', text: 'Rome' },
      ],
      correctAnswerId: 'a3',
      timeLimit: 15,
    },
    {
      id: 'q2',
      questionText: 'Which planet is known as the Red Planet?',
      answers: [
        { id: 'a1', text: 'Earth' },
        { id: 'a2', text: 'Mars' },
        { id: 'a3', text: 'Jupiter' },
        { id: 'a4', text: 'Venus' },
      ],
      correctAnswerId: 'a2',
      timeLimit: 15,
    },
    {
      id: 'q3',
      questionText: 'What is the largest ocean on Earth?',
      answers: [
        { id: 'a1', text: 'Atlantic Ocean' },
        { id: 'a2', text: 'Indian Ocean' },
        { id: 'a3', text: 'Arctic Ocean' },
        { id: 'a4', text: 'Pacific Ocean' },
      ],
      correctAnswerId: 'a4',
      timeLimit: 15,
    },
    {
        id: 'q4',
        questionText: 'In React, what hook is used to perform side effects in a function component?',
        answers: [
          { id: 'a1', text: 'useState' },
          { id: 'a2', text: 'useEffect' },
          { id: 'a3', text: 'useContext' },
          { id: 'a4', text: 'useReducer' },
        ],
        correctAnswerId: 'a2',
        timeLimit: 20,
    },
    {
        id: 'q5',
        questionText: 'Which of the following is NOT a JavaScript data type?',
        answers: [
          { id: 'a1', text: 'String' },
          { id: 'a2', text: 'Number' },
          { id: 'a3', text: 'Boolean' },
          { id: 'a4', text: 'Float' },
        ],
        correctAnswerId: 'a4',
        timeLimit: 15,
    }
];

export const matches: Match[] = [
  {
    id: 'match1',
    participants: [
      { user: currentUser, score: 30 },
      { user: users[1], score: 20 },
    ],
    status: 'finished',
    questions: questions.slice(0, 3),
    winnerId: currentUser.id,
    startedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    endedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'match2',
    participants: [
      { user: currentUser, score: 10 },
      { user: users[4], score: 40 },
    ],
    status: 'finished',
    questions: questions.slice(2, 5),
    winnerId: users[4].id,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    endedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 5).toISOString(),
  },
    {
    id: 'match3',
    participants: [
      { user: currentUser, score: 20 },
      { user: users[7], score: 20 },
    ],
    status: 'finished',
    questions: questions.slice(1, 4),
    winnerId: null, // Draw
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    endedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 5).toISOString(),
  },
];
