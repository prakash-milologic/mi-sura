import Header from "../_components/header";

export default async function SuperAdminAlarmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute mt-40 dark:bg-black w-full h-full">
      <Header title="Work Orders" />
      {children}
    </div>
  );
}
