import Header from "../_components/header";

export default async function SuperAdminReportingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute  mt-40 dark:bg-black w-full h-full">
      <Header title="Reporting" />
      {children}
    </div>
  );
}
