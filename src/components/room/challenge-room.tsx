"use client";

import type { Match, Question } from "@/lib/types";
import { useState, useEffect } from "react";
import { Scoreboard } from "./scoreboard";
import { Timer } from "./timer";
import { QuestionCard } from "./question-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Award, Loader2, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { currentUser } from "@/lib/data";

type GameState = "countdown" | "playing" | "between_questions" | "finished";

export function ChallengeRoom({ match: initialMatch }: { match: Match }) {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("countdown");
  const [match, setMatch] = useState(initialMatch);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0);

  const currentQuestion = match.questions[currentQuestionIndex];

  // Game Countdown
  useEffect(() => {
    if (gameState === "countdown") {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setGameState("playing");
        setTimeLeft(currentQuestion.timeLimit);
      }
    }
  }, [gameState, countdown, currentQuestion]);

  // Question Timer
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "playing" && timeLeft === 0) {
      handleAnswer(null); // Time's up
    }
  }, [gameState, timeLeft]);

  const handleAnswer = (answerId: string | null) => {
    setGameState("between_questions");
    const isCorrect = answerId === currentQuestion.correctAnswerId;
    
    // Simulate score update
    if (isCorrect) {
      const newParticipants = match.participants.map(p => 
        p.user.id === currentUser.id ? { ...p, score: p.score + 10 } : p
      );
      setMatch(prev => ({...prev, participants: newParticipants as [any, any]}));
    }

    setTimeout(() => {
      if (currentQuestionIndex < match.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setGameState("playing");
        setTimeLeft(match.questions[currentQuestionIndex + 1].timeLimit);
      } else {
        setGameState("finished");
      }
    }, 3000); // Wait 3 seconds before next question or end
  };

  const winner = match.participants.reduce((prev, current) => (prev.score > current.score) ? prev : current);
  const isDraw = match.participants[0].score === match.participants[1].score;

  if (gameState === "countdown") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
        <p className="text-2xl text-muted-foreground mb-4">Get Ready!</p>
        <p className="text-9xl font-bold font-headline">{countdown}</p>
      </div>
    );
  }

  if (gameState === "finished") {
    return (
       <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
        <Award className="w-24 h-24 text-yellow-400 mb-4" />
        <h1 className="text-4xl font-bold font-headline mb-2">
            {isDraw ? "It's a Draw!" : `${winner.user.name} Wins!`}
        </h1>
        <p className="text-2xl text-muted-foreground mb-8">
            Final Score: {match.participants[0].score} - {match.participants[1].score}
        </p>
        <Button onClick={() => router.push("/leaderboard")}>View Leaderboard</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto gap-6">
      <div className="grid grid-cols-3 items-center gap-4">
        <Scoreboard user={match.participants[0]} />
        <Timer duration={currentQuestion.timeLimit} currentTime={timeLeft} />
        <Scoreboard user={match.participants[1]} isOpponent />
      </div>

      {gameState === "playing" && (
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswer}
          key={currentQuestion.id}
        />
      )}

      {gameState === "between_questions" && (
        <Card className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
            <CardContent>
                <Loader2 className="w-16 h-16 animate-spin text-primary mb-4" />
                <h2 className="text-2xl font-bold font-headline">Next question incoming...</h2>
            </CardContent>
        </Card>
      )}

      <div className="mt-auto flex justify-end">
        <Button variant="destructive" size="sm">
            <Flag className="mr-2 h-4 w-4" /> Forfeit
        </Button>
      </div>
    </div>
  );
}
