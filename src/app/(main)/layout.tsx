import MainHeader from "@/components/structure/MainHeader";
import MainFooter from "@/components/structure/MainFooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}
