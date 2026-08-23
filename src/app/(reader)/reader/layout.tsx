import ReaderFooter from "@/components/reader/ReaderFooter";
import ReaderNavBar from "@/components/reader/ReaderNavBar";

export default function ReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-cream text-slate-dark">
      <ReaderNavBar />
      <main className="flex-1">{children}</main>
      <ReaderFooter />
    </div>
  );
}
