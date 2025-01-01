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

export const UserDropdown = () => {
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
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
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
