"use client";

import { cn } from "@/utils/tools";
import { useChatModal } from "../structure/ModalProviders";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "../ui/credenza";

export default function ChatModal() {
  const { chatModal, setChatModal } = useChatModal();

  return (
    <div
      className={cn(
        "fixed bottom-12 h-96 w-96 bg-background z-20 transition-all duration-500 ease-in-out border-2 rounded-2xl shadow-md",
        chatModal.opened ? "right-12" : "right-[-30rem]"
      )}
    >
      <div></div>
    </div>
  );
}
