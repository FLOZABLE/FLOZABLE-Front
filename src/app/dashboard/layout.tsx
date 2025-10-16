import AddSubjectModal from "@/components/modals/AddSubjectModal";
import ChatModal from "@/components/modals/ChatModal";
import CreateGroupModal from "@/components/modals/CreateGroupModal";
import CreateThemeModal from "@/components/modals/CreateThemeModal";
import GroupLeaderboardModal from "@/components/modals/GroupLeaderboardModal";
import JoinGroupModal from "@/components/modals/JoinGroupModal";
import PlanModal from "@/components/modals/PlanModal";
import SearchUsersModal from "@/components/modals/SearchUsersModal";
import ThemeModal from "@/components/modals/ThemeModal";
import RedirectOnMobile from "@/components/others/RedirectOnMobile";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PlanModal />
      <JoinGroupModal />
      <CreateGroupModal />
      <ChatModal />
      <GroupLeaderboardModal />
      <RedirectOnMobile />
      <AddSubjectModal />
      <SearchUsersModal />
      <CreateThemeModal />
      <ThemeModal />

      {children}
    </>
  );
}
