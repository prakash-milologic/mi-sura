import React from "react";
import { Navbar, NavbarContent } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { CloudAndSun, SunOnly } from "@/app/assets/SVGCollection";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { ModeToggle } from "./mode-toggle";

interface Props {
  children: React.ReactNode;
}

function capitalizeFirstLetter(data: string) {
  if (!data) return data;
  return data.charAt(0).toUpperCase() + data.slice(1);
}

export const NavbarWrapper = ({ children }: Props) => {
  const [isDashboard, setIsDashboard] = React.useState(false);
  const { theme, resolvedTheme } = useTheme(); // Use resolvedTheme for fallback
  const pathname = usePathname();
  const lastPath = capitalizeFirstLetter(pathname.split("/").pop() as string);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true); 
  }, []);

  React.useEffect(() => {
    if (pathname === "/super_admin/dashboard") {
      setIsDashboard(true);
    } else {
      setIsDashboard(false);
    }
  }, [pathname]);

  if (!mounted) {
    return null; // Prevent rendering until mounted
  }

  const isLightTheme = (theme || resolvedTheme) === "light";

  const navbarStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: "32px",
    paddingLeft: "32px",
    paddingRight: "32px",
    height: "130px",
    flexWrap: "wrap" as const,
    color: isLightTheme ? "black" : "white",
    backgroundColor: isLightTheme ? "#EFF4F8" : "#0B0A08",
    borderBottom: "0px"
  };

  const navbarDashboardStyles: any = {
    ...navbarStyles,
    height: "300px",
    color: "white",
    backgroundImage: `url(${isLightTheme ? "/header.png" : "/header-dark.png"})`,
    backgroundSize: "cover",
    position: "absolute" as const,
    zIndex: 0,
  };

  return (
    <div className="relative flex flex-col flex-1">
      <Navbar
      className="w-full"
      classNames={{
        wrapper: "w-full max-w-full md:max-h-[20px] md:bg-transparent",
      }}
        style={lastPath === "Dashboard" ? navbarDashboardStyles : navbarStyles}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>

        <NavbarContent justify="start" className="flex items-start flex-col gap-2 md:block hidden ">
          <p className="xl:text-5xl text-xl font-bold ">
            {lastPath === "Dashboard" ? "Welcome, Rishi" : lastPath}
          </p>
          <p className={`xl:text-base ${isDashboard ? "text-white":"text-[#686868] dark:text-white"} text-xs font-normal`}>Some content regarding {lastPath.toLowerCase()} goes here.</p>
        </NavbarContent>
        <NavbarContent className="flex pt-8 gap-8">
          <div className="flex gap-1 xl:flex hidden">
           {isDashboard ?  <CloudAndSun className="ml-2" /> : <SunOnly />}
            <div className="flex flex-col justify-center">
              <p className="text-base font-normal">22°C</p>
              <p className="text-xs font-normal whitespace-nowrap">Kuala Lumpur, Malaysia</p>
            </div>
          </div>

          <div className="h-8 w-[1px] border bg-[#FFFFFF33] rounded-full xl:block hidden"></div>
          <ModeToggle isDashboard={isDashboard} />
          <NotificationsDropdown isDashboard={isDashboard} />
          <UserDropdown  />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
