import Header from "../_components/header";

export default async function SuperAdminAlarmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" dark:bg-black w-full h-full">
      <Header title="Alarms" />
      {children}
    </div>
  );
}
