import Header from "../_components/header";

export default async function UserWorkOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="Work Orders" />
      <div className="px-6">{children}</div>
    </div>
  );
}
