import Header from "../_components/header";

export default async function InstallerAccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="Accounts" />
      <div className="px-6">{children}</div>
    </div>
  );
}
