import type { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] w-full min-w-0 flex-col bg-white text-gray-500 lg:flex-row">
      {children}
    </div>
  );
}
