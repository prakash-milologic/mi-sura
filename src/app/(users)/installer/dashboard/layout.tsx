"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../_components/header";

const queryClient = new QueryClient();

export default function InstallerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header title="Dashboard" />
        {children}
      </div>
    </QueryClientProvider>
  );
}
