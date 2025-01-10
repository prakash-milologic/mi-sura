import Header from "../_components/header";

export default async function SuperAdminReportingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#EFF4F8] md:pt-12 pt-2 dark:bg-[#0B0A08]">
      {/* <Header title="Reporting" /> */}
      {children}
    </div>
  );
}
