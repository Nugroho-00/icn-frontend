"use client";
import React from "react";
import { createPortal } from "react-dom";
// import { Button } from "@/components/ui/button";
// import { MessageSquare } from "lucide-react";
// import { Toaster } from "@/components/ui/sonner";
import SidebarChat from "@/components/sidebar";
function SuperTop({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* gunakan pointer-events-none di wrapper agar tidak blokir klik lain */}
      <div className="pointer-events-auto">{children}</div>
    </div>,
    document.body
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <SuperTop>
        {/* <Button
          className="fixed bottom-5 right-5 rounded-full p-3 shadow-lg"
          onClick={() => console.log("open chat")}
        >
          <MessageSquare />
        </Button> */}
        <SidebarChat />
      </SuperTop>
      {/* <Toaster /> */}
      <div className="w-full bg-white p-6 rounded-lg">{children}</div>
    </div>
  );
}
