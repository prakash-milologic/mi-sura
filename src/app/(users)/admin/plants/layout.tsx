import Header from "../_components/header";

export default async function AdminPlantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="Plants" />
      {children}
    </div>
  );
}
