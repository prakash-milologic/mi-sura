"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";
import { AcmeLogo } from "../icons/acmelogo";
import { BottomIcon } from "../icons/sidebar/bottom-icon";
import Image from "next/image";
import { Darklogo, LightLogo } from "@/app/assets/SVGCollection";
import { useTheme } from "next-themes"
interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const { theme } = useTheme();

  const [company, setCompany] = useState<Company>({
    name: "MI-Suria",
    location: "Kedah, Alor Setar",
    logo: <AcmeIcon />,
  });
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="pointer-events-none">
        {/* <Image
          src="/mi-suria-logo.png"
          width={500}
          height={500}
          alt="Mi-SURIA logo"
        /> */}
        {
          theme === "dark" ?
            <Darklogo />
            :
           <LightLogo />
        }
      
      </DropdownTrigger>
      <DropdownMenu
        onAction={(e) => {
          if (e === "1") {
            setCompany({
              name: "MI-SURIA",
              location: "Kedah, Alor Setar",
              logo: <AcmeIcon />,
            });
          }
          if (e === "2") {
            setCompany({
              name: "Plant 2",
              location: "Pulau Pinang, Bayan Lepas",
              logo: <AcmeLogo />,
            });
          }
          if (e === "3") {
            setCompany({
              name: "Plant 3",
              location: "Selangor, Subang Jaya",
              logo: <AcmeIcon />,
            });
          }
          if (e === "4") {
            setCompany({
              name: "Plant 4",
              location: "Pulau Pinang, Batu Kawan",
              logo: <AcmeIcon />,
            });
          }
        }}
        aria-label="Avatar Actions"
      >
        <DropdownSection title="Companies">
          <DropdownItem
            key="1"
            startContent={<AcmeIcon />}
            description="Kedah, Alor Setar"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Plant 1
          </DropdownItem>
          <DropdownItem
            key="2"
            startContent={<AcmeLogo />}
            description="Pulau Pinang, Bayan Lepas"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Plant 2
          </DropdownItem>
          <DropdownItem
            key="3"
            startContent={<AcmeIcon />}
            description="Selangor, Subang Jaya"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Plant 3
          </DropdownItem>
          <DropdownItem
            key="4"
            startContent={<AcmeIcon />}
            description="Pulau Pinang, Batu Kawan"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Plant 4
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
