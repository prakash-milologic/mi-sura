"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Header({ title }: { title: string }) {
  const pathname = usePathname();
  const breadcrumbs = pathname.split("/").slice(3);
  // console.log("breadcrumbs", breadcrumbs);

  return (
    <div className="items-center flex p-6">
      <Breadcrumbs
        itemClasses={{
          item: "text-2xl font-semibold",
        }}
        className="capitalize"
      >
        <BreadcrumbItem href={`/admin/${title.toLowerCase()}`}>
          {title}
        </BreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => {
          const path = `/${breadcrumbs.slice(0, index + 1).join("/")}`;

          // console.log("path", path);
          // console.log("breadcrumb", breadcrumb);

          return (
            <BreadcrumbItem key={path} href={path}>
              {pathname.split("/").at(2) === "plants" && "plant"}
              {breadcrumb.replace("_", " ")}
              {/* {breadcrumb.replace(/[^a-zA-Z]/g, " ")} */}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
      {/* <p className="text-3xl font-bold">{title}</p> */}
    </div>
  );
}
