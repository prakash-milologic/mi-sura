import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AnalysisIcon } from "../icons/sidebar/analysis-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { Antenna, BellRing, Layers3, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { MdFactory } from "react-icons/md";
import { HiServer, HiMiniDocumentChartBar } from "react-icons/hi2";
import { IoPieChartSharp } from "react-icons/io5";
import { FaGem, FaBuilding } from "react-icons/fa";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full text-white">
          <div className={Sidebar.Body()}>
            <SidebarMenu title="Overview">
              <SidebarItem
                title="Dashboard"
                icon={<HomeIcon />}
                isActive={pathname === "/admin/dashboard"}
                href="/admin/dashboard"
              />
            </SidebarMenu>

            <SidebarMenu title="Management">
              <SidebarItem
                isActive={pathname === "/admin/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="/admin/accounts"
              />
              <SidebarItem
                isActive={
                  pathname === "/admin/plants" ||
                  pathname.split("/")[2] === "plants"
                }
                title="Plants"
                icon={<FaBuilding className="w-6 h-6" color="#969696" />}
                href="/admin/plants"
              />
              <SidebarItem
                isActive={
                  pathname === "/admin/devices" ||
                  pathname.split("/")[2] === "devices"
                }
                title="Devices"
                icon={<HiServer className="w-6 h-6" color="#969696" />}
                href="/admin/devices"
              />
              {/* <SidebarItem
                isActive={pathname === "/admin/work_orders"}
                title="Work Orders"
                icon={
                  <Layers3
                    className={cn("text-foreground-400", {
                      "text-stone-300": pathname === "/admin/work_orders",
                    })}
                  />
                }
                href="/admin/work_orders"
              /> */}
              {/* <SidebarItem
                isActive={pathname === "/admin/alarms"}
                title="Alarms"
                icon={
                  <BellRing
                    className={cn("text-foreground-400", {
                      "text-stone-300": pathname === "/admin/alarms",
                    })}
                  />
                }
                href="/admin/alarms"
              /> */}
              {/* <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
              <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              /> */}
            </SidebarMenu>

            <SidebarMenu title="Monitoring">
              {/* <SidebarItem
                isActive={pathname === "/admin/analytics"}
                title="Analytics"
                icon={<IoPieChartSharp className="w-6 h-6" color="#969696" />}
                href="/admin/analytics"
              /> */}
              <SidebarItem
                isActive={
                  pathname === "/admin/reporting" ||
                  pathname.split("/")[2] === "reporting"
                }
                title="Reporting"
                icon={
                  <HiMiniDocumentChartBar className="w-6 h-6" color="#969696" />
                }
                href="/admin/reporting"
              />
            </SidebarMenu>

            {/* <SidebarMenu title="Advanced">
              <SidebarItem
                isActive={pathname === "/upcoming"}
                title="Upcoming"
                icon={<FaGem color="#969696" />}
                // href="/upcoming"
              />
            </SidebarMenu> */}
          </div>

          {/* <SidebarMenu title="General">
              <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div> */}
          {/* <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div> */}
        </div>
      </div>
    </aside>
  );
};
