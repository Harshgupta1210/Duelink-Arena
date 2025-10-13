"use client";

import type { User } from "@/lib/types";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Swords, Search, UserCheck, UserX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const statusIndicator = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  offline: "bg-gray-500",
};

export function ClassmateList({ classmates }: { classmates: User[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const filteredClassmates = classmates
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => filter === "all" || c.onlineStatus === filter);

  const handleInvite = (classmate: User) => {
    toast({
      title: "Invitation Sent!",
      description: `Your challenge has been sent to ${classmate.name}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>All Classmates</CardTitle>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classmates..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {filteredClassmates.map((classmate) => (
            <div
              key={classmate.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={classmate.avatarUrl} alt={classmate.name} />
                  <AvatarFallback>{classmate.name.slice(0, 2)}</AvatarFallback>
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-card",
                      statusIndicator[classmate.onlineStatus]
                    )}
                  />
                </Avatar>
                <div>
                  <p className="font-semibold">{classmate.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {classmate.onlineStatus}
                  </p>
                </div>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={classmate.onlineStatus === "offline" ? "secondary" : "default"}
                    disabled={classmate.onlineStatus === "offline"}
                  >
                    <Swords className="mr-2 h-4 w-4" />
                    Invite
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Challenge {classmate.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      An invitation to a duel will be sent. They will be notified and can accept or decline.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleInvite(classmate)}>
                      Send Invite
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
          ))}
          {filteredClassmates.length === 0 && (
             <div className="text-center py-10 text-muted-foreground">
                <UserX className="mx-auto h-12 w-12" />
                <p className="mt-4">No classmates found.</p>
                <p className="text-sm">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
