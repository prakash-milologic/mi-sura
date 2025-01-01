import Header from "../_components/header";

export default async function InstallerPlantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="Plants" />
      <div className="px-6">{children}</div>
    </div>
  );
}
