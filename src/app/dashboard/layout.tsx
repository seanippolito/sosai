import SideNav from "@/components/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  console.log(`Inside and leaving dashboard layout`);
  return (
    <div className="flex h-screen w-full flex-col border-4 border-blue-500 md:flex-row md:overflow-hidden">
      <div className="border-2 border-amber-400 md:w-64">
        <SideNav />
      </div>
      {children}
    </div>
  );
}
