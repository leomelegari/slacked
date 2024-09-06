import {
  MessageSquareTextIcon,
  PencilIcon,
  SmileIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Hint from "./hint";
import EmojiPopover from "./emoji-popover";
import { Id } from "../../convex/_generated/dataModel";

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleRemove: () => void;
  hideThreadButton?: boolean;
  handleReaction: (value: string) => void;
}

export default function Toolbar({
  handleRemove,
  handleEdit,
  handleReaction,
  handleThread,
  hideThreadButton,
  isAuthor,
  isPending,
}: ToolbarProps) {
  return (
    <div className="absolute top-0 right-5">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
        <EmojiPopover
          hint="Add reaction"
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant="ghost" size="iconSm" disabled={isPending}>
            <SmileIcon className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button
              variant="ghost"
              size="iconSm"
              disabled={isPending}
              onClick={handleThread}
            >
              <MessageSquareTextIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <>
            <Hint label="Edit message">
              <Button
                variant="ghost"
                size="iconSm"
                disabled={isPending}
                onClick={handleEdit}
              >
                <PencilIcon className="size-4" />
              </Button>
            </Hint>
            <Hint label="Delete message">
              <Button
                variant="ghost"
                size="iconSm"
                disabled={isPending}
                onClick={handleRemove}
              >
                <Trash2Icon className="size-4 text-red-700" />
              </Button>
            </Hint>
          </>
        )}
      </div>
    </div>
  );
}
