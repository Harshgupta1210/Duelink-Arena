"use client";

import type { Question } from "@/lib/types";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuestionCard({
  question,
  onAnswer,
}: {
  question: Question;
  onAnswer: (answerId: string | null) => void;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelect = (answerId: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answerId);
    onAnswer(answerId);
  };
  
  const getButtonVariant = (answerId: string) => {
    if (!selectedAnswer) return "outline";
    if (answerId === question.correctAnswerId) return "default";
    if (answerId === selectedAnswer && answerId !== question.correctAnswerId) return "destructive";
    return "outline";
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          {question.questionText}
        </CardTitle>
        <CardDescription>Select the correct answer below.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.answers.map((answer, index) => (
            <Button
              key={answer.id}
              variant={getButtonVariant(answer.id)}
              className={cn(
                "h-auto justify-start p-4 text-left whitespace-normal",
                selectedAnswer && "pointer-events-none"
              )}
              onClick={() => handleSelect(answer.id)}
            >
              <span className="font-bold mr-4">{String.fromCharCode(65 + index)}.</span>
              <span>{answer.text}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
