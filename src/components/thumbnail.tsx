import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ThumbnailProps {
  url: string | null | undefined;
}

export default function Thumbnail({ url }: ThumbnailProps) {
  if (!url) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-sm border rounded-lg my-2 cursor-zoom-in">
          <img
            src={url}
            alt="message image"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
        <img
          src={url}
          alt="message image"
          className="rounded-md object-cover size-full"
        />
      </DialogContent>
    </Dialog>
  );
}
