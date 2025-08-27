import AddSubjectModal from "@/components/modals/AddSubjectModal";
import CreateThemeModal from "@/components/modals/CreateThemeModal";
import SearchUsersModal from "@/components/modals/SearchUsersModal";
import RedirectOnMobile from "@/components/others/RedirectOnMobile";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RedirectOnMobile />
      <AddSubjectModal />
      <SearchUsersModal />
      <CreateThemeModal />
      
      {children}
    </>
  );
}
