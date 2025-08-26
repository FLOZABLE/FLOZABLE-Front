import AddSubjectModal from "@/components/modals/AddSubjectModal";
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
      {children}
    </>
  );
}
