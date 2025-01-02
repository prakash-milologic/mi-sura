import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import { StyledBurgerButton } from "./navbar.styles";
import { Hamburger } from "@/app/assets/SVGCollection";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    // <div
    //   className={StyledBurgerButton()}
    //   // open={collapsed}
    //   onClick={setCollapsed}
    // >
    //   <div />
    //   <div />
    // </div>
    <Hamburger />
  );
};
