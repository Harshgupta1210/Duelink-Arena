"use client";

import type { Invite } from "@/lib/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Swords, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const statusBadgeVariant = {
  pending: "default",
  accepted: "secondary",
  rejected: "destructive",
  cancelled: "outline",
} as const;

export function InviteList({
  received,
  sent,
}: {
  received: Invite[];
  sent: Invite[];
}) {
  const { toast } = useToast();
  const router = useRouter();

  const handleAccept = (invite: Invite) => {
    toast({
      title: "Challenge Accepted!",
      description: `Joining room to duel ${invite.fromUser.name}.`,
    });
    // Simulate joining a room
    router.push(`/room/${invite.id}`);
  };

  const handleReject = (invite: Invite) => {
    toast({
      title: "Invite Rejected",
      variant: "destructive",
      description: `You have rejected the challenge from ${invite.fromUser.name}.`,
    });
  };

  return (
    <Tabs defaultValue="received">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="received">Received ({received.filter(i => i.status === 'pending').length})</TabsTrigger>
        <TabsTrigger value="sent">Sent</TabsTrigger>
      </TabsList>
      <TabsContent value="received">
        <Card>
          <CardContent className="p-6 space-y-4">
            {received.length > 0 ? received.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={invite.fromUser.avatarUrl} />
                    <AvatarFallback>{invite.fromUser.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {invite.fromUser.name}{" "}
                      <span className="font-normal text-muted-foreground">
                        sent you a challenge
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(invite.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                {invite.status === 'pending' ? (
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive" onClick={() => handleReject(invite)}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => handleAccept(invite)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                    <Badge variant={statusBadgeVariant[invite.status]}>{invite.status}</Badge>
                )}
              </div>
            )) : <p className="text-muted-foreground text-center py-8">No received invites.</p>}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sent">
        <Card>
          <CardContent className="p-6 space-y-4">
          {sent.length > 0 ? sent.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={invite.toUser.avatarUrl} />
                    <AvatarFallback>{invite.toUser.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      <span className="font-normal text-muted-foreground">
                        You challenged{" "}
                      </span>
                      {invite.toUser.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(invite.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <Badge variant={statusBadgeVariant[invite.status]}>{invite.status}</Badge>
              </div>
            )) : <p className="text-muted-foreground text-center py-8">No sent invites.</p>}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
