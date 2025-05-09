import { Dispatch } from "react";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";
import SubjectTimer from "../study/SubjectTimer";

type StudyModalProps = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function StudyModal({ open, setOpen }: StudyModalProps) {
  return (
    <Credenza
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <CredenzaContent className="w-fit">
        <CredenzaHeader>
          <CredenzaTitle>Select a subject to study!</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>{open && <SubjectTimer />}</CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
