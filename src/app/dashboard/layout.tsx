import RedirectOnMobile from "@/components/others/RedirectOnMobile";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RedirectOnMobile />
      {children}
    </>
  );
}
