import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import clsx from "clsx";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-[#171717CC] dark:text-white active:bg-none max-w-full "
    >
      <div
        className={clsx(
          isActive
            ? "bg-primary [&_svg_path]:fill-background dark:[&_svg_path]:fill-white text-white dark:text-white "
            : "hover:bg-gray-100 dark:hover:bg-primary [&_svg_path]:fill-[#171717CC] dark:[&_svg_path]:fill-white  ",
          "dark:text-white flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        {icon}
        <span
          className={clsx(
            isActive ? "text-white" : "text-[#171717CC] dark:text-white text-base font-normal",
          )}
          
        >
          {title}
        </span>
      </div>
    </NextLink>
  );
};
