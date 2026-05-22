import Navbar from "@/components/navbar/NavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
