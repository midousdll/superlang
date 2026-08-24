// src/app/(reader)/reader/layout.tsx
import React from "react";

export default function ReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-cream text-slate-dark">
      {children}
    </div>
  );
}