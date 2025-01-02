import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { signOut } from "@/app/auth/actions";
import readUserSession from "@/lib/actions";
import { DownArrow } from "@/app/assets/SVGCollection";
import Image from "next/image";

export const UserDropdown = ({isDashboard=false}:{isDashboard:boolean}) => {
  const [userEmail, setUserEmail] = useState("");

  const onLogout = async () => {
    await signOut();
  };

  useEffect(() => {
    const readSession = async () => {
      const { data } = await readUserSession();
      if (data.session?.user.email) {
        setUserEmail(data.session?.user.email);
      }
    };

    readSession();
  }, []);

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger className="w-full cursor-pointer" >
          <div className="flex flex-row gap-16 items-center  bg-white dark:bg-[#43434A] rounded-lg p-2">
            <div className="flex gap-4">
              <Image src="/profile.png" alt="profile" width={40} height={40} />
              <div className="flex flex-col"> 
                <p className={`text-sm font-semibold dark:text-white ${isDashboard && "text-black"}`}>Rishi Blavin</p>
                <p className="text-xs font-medium text-[#686868] dark:text-[#FFFFFFCC]">super@gmail.com</p>
              </div>
            </div>
      <div > 
            <DownArrow />
            </div>
          </div>


        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{userEmail}</p>
        </DropdownItem>
        {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
        {/* <DropdownItem key="team_settings">Team Settings</DropdownItem> */}
        {/* <DropdownItem key="analytics">Analytics</DropdownItem> */}
        {/* <DropdownItem key="system">System</DropdownItem> */}
        {/* <DropdownItem key="configurations">Configurations</DropdownItem> */}
        <DropdownItem
          key="help_and_support"
          href="https://vigors.atlassian.net/servicedesk/customer/portal/1"
          target="_blank"
        >
          Help & Support
        </DropdownItem>
        <DropdownItem
          onPress={onLogout}
          key="logout"
          color="danger"
          className="text-danger"
        >
          Log Out
        </DropdownItem>
        {/* <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};
