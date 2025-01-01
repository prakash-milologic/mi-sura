"use client";
import React from "react";
import {
  PersonIcon,
  DesktopIcon,
  ExclamationTriangleIcon,
  LightningBoltIcon,
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
      href: "/super_admin/account_management",
      text: "Account Management",
      Icon: PersonIcon,
    },
    {
      href: "/super_admin/monitor",
      text: "Plant",
      Icon: DesktopIcon,
    },
    {
      href: "/super_admin/device",
      text: "Device",
      Icon: LightningBoltIcon,
    },
    {
      href: "/super_admin/alert",
      text: "Alert",
      Icon: ExclamationTriangleIcon,
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
