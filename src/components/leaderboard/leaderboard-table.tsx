"use client";

import type { LeaderboardEntry } from "@/lib/types";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

export function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  const [period, setPeriod] = useState("all-time");
  // Pagination state could be added here
  
  const rankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-yellow-600";
    return "text-muted-foreground";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Top Players</CardTitle>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="section-a">Section A</SelectItem>
                <SelectItem value="section-b">Section B</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="all-time">All-Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-center">Wins</TableHead>
              <TableHead className="text-center">Losses</TableHead>
              <TableHead className="text-center">Draws</TableHead>
              <TableHead className="text-right">Win Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.user.id}>
                <TableCell className="font-bold text-lg">
                  <span className={rankColor(entry.rank)}>{entry.rank}</span>
                  {entry.rank === 1 && <Crown className="inline-block ml-1 h-5 w-5 text-yellow-400" />}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.user.avatarUrl} />
                      <AvatarFallback>
                        {entry.user.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{entry.user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-green-500 font-medium">{entry.wins}</TableCell>
                <TableCell className="text-center text-destructive font-medium">{entry.losses}</TableCell>
                <TableCell className="text-center text-muted-foreground font-medium">{entry.draws}</TableCell>
                <TableCell className="text-right font-mono">
                  {(entry.winRate * 100).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination controls would go here */}
      </CardContent>
    </Card>
  );
}
