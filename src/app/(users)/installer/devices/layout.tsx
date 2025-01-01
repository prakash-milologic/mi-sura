import Header from "../_components/header";

export default async function InstallerDevicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="Devices" />
      <div className="px-6">{children}</div>
    </div>
  );
}
