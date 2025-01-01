"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../_components/header";

const queryClient = new QueryClient();

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#EFF4F8] pt-12 dark:bg-[#0B0A08]">
        {children}
      </div>
    </QueryClientProvider>
  );
}
