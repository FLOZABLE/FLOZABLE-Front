import { EventPlan } from "@/types/plan";

interface Position {
  top: number;
  left: number;
}

interface PlanViewerProps {
  position: Position;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  plan: EventPlan | null;
}

export default function PlanViewer({
  position,
  open,
  setOpen,
  plan,
}: PlanViewerProps) {
  return (
    <div
      className="fixed z-50 transition-all duration-300 ease-in-out w-[300px] bg-accent rounded-2xl shadow-md p-5"
      style={position}
    >
      {plan?.title}
      {plan?.description}
    </div>
  );
}
