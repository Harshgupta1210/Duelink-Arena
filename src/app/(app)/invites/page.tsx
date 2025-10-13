import { InviteList } from "@/components/invites/invite-list";
import { invites, currentUser } from "@/lib/data";

export default function InvitesPage() {
  const receivedInvites = invites.filter(inv => inv.toUser.id === currentUser.id);
  const sentInvites = invites.filter(inv => inv.fromUser.id === currentUser.id);

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Invitations</h1>
        <p className="text-muted-foreground">Manage your duel requests.</p>
      </div>
      <InviteList received={receivedInvites} sent={sentInvites} />
    </div>
  );
}
