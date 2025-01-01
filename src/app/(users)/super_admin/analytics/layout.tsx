import Header from "../_components/header";

export default async function SuperAdminAnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="Analytics" />
      {children}
    </div>
  );
}
