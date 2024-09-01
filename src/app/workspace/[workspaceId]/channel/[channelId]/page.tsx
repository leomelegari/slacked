"use client";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Loader, TriangleAlert } from "lucide-react";
import Header from "./header";
import ChatInput from "./chat-input";

interface ChannelPageProps {
  params: {
    channelId: Id<"channels">;
    workspaceId: Id<"workspaces">;
  };
}

export default function ChannelPage({ params }: ChannelPageProps) {
  const { channelId, workspaceId } = params;
  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Channel not found!
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title={channel.name} />
      <div className="flex-1" />
      <ChatInput placeholder={`Message #${channel.name}`} />
    </div>
  );
}
