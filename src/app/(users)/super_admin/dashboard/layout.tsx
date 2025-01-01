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
      <div className="mt-36">
        {/* <Header title="Dashboard" /> */}
        {children}
      </div>
    </QueryClientProvider>
  );
}
