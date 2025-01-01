"use client";
import React from "react";
import {
  PersonIcon,
  DesktopIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const sidebarPath = pathname.split("/")[2];

  // console.log(sidebarPath);

  const getSidebarLink = (link: string) => {
    return link.split("/")[2];
  };

  const links = [
    {
      href: "/user/profile",
      text: "Profile",
      Icon: PersonIcon,
    },
  ];

  return (
    <div className="space-y-5">
      {links.map((link, index) => {
        const Icon = link.Icon;
        return (
          <Link
            onClick={() => document.getElementById("sidebar-close")?.click()}
            href={link.href}
            key={index}
            className={cn("flex text-sm items-center gap-2 rounded-sm p-2", {
              " bg-green-500 dark:bg-green-700 text-white ":
                sidebarPath === getSidebarLink(link.href),
            })}
          >
            <Icon />
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
