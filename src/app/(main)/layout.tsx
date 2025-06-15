import MainFooter from "@/components/structure/MainFooter";
import MainHeader from "@/components/structure/MainHeader";

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
