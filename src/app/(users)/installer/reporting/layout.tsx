import Header from "../_components/header";

export default async function SuperAdminReportingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="Reporting" />
      {children}
    </div>
  );
}
