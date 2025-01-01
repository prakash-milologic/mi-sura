import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { SearchIcon } from "../icons/searchicon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { ModeToggle } from "./mode-toggle";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    // <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
    <div className="relative flex flex-col flex-1">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="invisible w-full max-md:hidden">
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full p-10"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full ",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        
        <NavbarContent
          justify="end"
          className="w-full data-[justify=end]:flex-grow-0"
        >
          <NavbarContent>
            <ModeToggle/>
          </NavbarContent>
          {/* <div className="flex items-center gap-2 max-md:hidden">
            <FeedbackIcon />
            <span>Feedback?</span>
          </div> */}

          <NotificationsDropdown />

          {/* <div className="max-md:hidden">
            <SupportIcon />
          </div> */}

          {/* <Link
            href="https://github.com/Siumauricio/nextui-dashboard-template"
            target={"_blank"}
          >
            <GithubIcon />
          </Link> */}
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
