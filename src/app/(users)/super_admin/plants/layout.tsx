import Header from "../_components/header";

export default async function SuperAdminPlantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-white dark:bg-black w-full h-full">
      {/* <Header title="Plants" /> */}
      {children}
    </div>
  );
}
