import Header from "../_components/header";

export default async function SuperAdminAlarmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="Work Orders" />
      {children}
    </div>
  );
}
