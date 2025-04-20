import { Popover, PopoverContent } from "../ui/popover";

interface Position {
  top: number;
  left: number;
}

interface PlanViewerProps {
  position: Position;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlanViewer({
  position,
  open,
  setOpen,
}: PlanViewerProps) {
  console.log(open, "open");
  return (
    <div
      className="fixed z-50 transition-all duration-300 ease-in-out"
      style={position}
    >
      sdfsdfsd
    </div>
  );
}
