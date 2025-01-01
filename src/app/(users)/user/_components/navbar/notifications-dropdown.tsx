"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { NotificationIcon } from "../icons/navbar/notificationicon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Bell } from "lucide-react";

function fetchAlarms({ time }: { time: string }) {
  return axios.get(`/api/tsdb/alarms?time=${time}&limit=5`);
}

export const NotificationsDropdown = () => {
  const [today, setToday] = useState(new Date().toISOString());
  // query alarms based on datePickerValue value
  const { data: alarms } = useQuery({
    queryKey: ["alarms", today],
    queryFn: () => fetchAlarms({ time: today }),
    refetchInterval: 30000,
  });
  // console.log("alarms", alarms?.data?.length);

  const notifications =
    alarms?.data?.map((alarm: any) => ({
      id: alarm?.z_timestamp,
      status: alarm?.alarm,
      plant: alarm?.plantName,
      device: alarm?.deviceName,
      openedTime: alarm?.z_timestamp,
    })) || [];

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon count={notifications?.length || 0} />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notifications">
          {notifications?.length ? (
            notifications?.map((notif: any) => (
              <DropdownItem
                classNames={{
                  base: "py-2",
                  title: "text-base font-semibold",
                }}
                key={notif?.z_timestamp}
                description={`You have a new alarm on ${
                  notif?.device
                } of plant ${notif?.plant} triggered at ${
                  notif?.openedTime &&
                  new Date(notif?.openedTime).toLocaleString()
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <div>{notif?.status}</div>
                </div>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem
              classNames={{
                base: "py-2",
                title: "text-base font-semibold",
              }}
              key="0"
            >
              Empty
            </DropdownItem>
          )}
          {/* <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
            description="You have been added as a channel/partner of plant [Greenbase Solution (MIMOS) ] by user B2190901794(super@gmail.com)."
          >
            🤝 Channel/Partner
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Device [Device Model: SG3.0RS] back online at [Greenbase Solution (MIMOS)]."
          >
            🛠️ Operational Alert
          </DropdownItem> */}
          {/* <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
          >
            📣 Edit your information
          </DropdownItem> */}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
