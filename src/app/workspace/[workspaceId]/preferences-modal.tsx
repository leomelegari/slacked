import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";

import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export default function PreferencesModal({
  initialValue,
  open,
  setOpen,
}: PreferencesModalProps) {
  const workspaceId = useWorkspaceId();

  const [value, setValue] = useState<string>(initialValue);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [removeOpen, setRemoveOpen] = useState<boolean>(false);

  const { mutate: updateWorkspace, isPending: updatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: removingWorkspace } =
    useRemoveWorkspace();

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateWorkspace(
      {
        id: workspaceId,
        name: value,
      },
      {
        onSuccess() {
          toast.success("Workspace updated!");
          setEditOpen(false);
        },
        onError() {
          toast.error("Something went wrong... please, try again!");
        },
      },
    );
  };

  const handleRemove = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess() {
          toast.success("Workspace removed!");
          setEditOpen(false);
        },
        onError() {
          toast.error("Something went wrong... please, try again!");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Workspace Name</p>
                  <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                    Edit
                  </p>
                </div>
                <p className="text-sm text-left">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename this workspace</DialogTitle>
              </DialogHeader>
              <form action="" className="space-y-4" onSubmit={handleEdit}>
                <Input
                  value={value}
                  disabled={updatingWorkspace}
                  onChange={(e) => setValue(e.target.value)}
                  required
                  autoFocus
                  minLength={3}
                  maxLength={80}
                  placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={updatingWorkspace}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button disabled={updatingWorkspace}>Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog open={removeOpen} onOpenChange={setRemoveOpen}>
            <DialogTrigger asChild>
              <button
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
                disabled={false}
                onClick={() => {}}
              >
                <Trash className="size-4 " />
                <p className="text-sm font-semibold">Delete workspace</p>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove this workspace</DialogTitle>
                <p className="text-sm text-slate-600">
                  Are you sure? This cannot be undone!
                </p>
              </DialogHeader>
              <form onSubmit={handleRemove}>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={removingWorkspace}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button disabled={removingWorkspace} variant="destructive">
                    Remove
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
