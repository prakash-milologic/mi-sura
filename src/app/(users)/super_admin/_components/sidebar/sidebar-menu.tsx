import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const SidebarMenu = ({ title, children }: Props) => {
  return (
    <div className="flex gap-2 flex-col">
      <span className="text-xs font-normal text-[#686868] dark:text-white ">{title}</span>
      {children}
    </div>
  );
};
