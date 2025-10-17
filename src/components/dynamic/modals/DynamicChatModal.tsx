import dynamic from "next/dynamic";

function ChatModalLoader() {
  return (
    <div className="fixed bottom-20 h-96 w-96 z-20">
      <p className="absolute-center">Chats Loading...</p>
    </div>
  );
}

const DynamicChatModal = dynamic(
  () => import("@/components/modals/ChatModal"),
  {
    ssr: false,
    loading: ChatModalLoader,
  },
);

export default DynamicChatModal;
