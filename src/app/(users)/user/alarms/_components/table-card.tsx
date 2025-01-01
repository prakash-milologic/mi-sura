"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
  CardProps,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ChevronUp,
  DatabaseZap,
  LucideIcon,
} from "lucide-react";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { alerts } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "next-themes";

function fetchAlarms({ time }: { time: string }) {
  return axios.get(`/api/tsdb/alarms?time=${time}`);
}

export type IAlert = {
  id: string;
  status: string;
  plant: string;
  device: string;
  openedTime: string;
};

export default function TableCard() {
  // mui datetime picker related hooks
  const {
    theme: activeTheme,
    setTheme: setActiveTheme,
    systemTheme,
  } = useTheme();
  const [theme, setTheme] = useState(() => createTheme());
  const [disabledDatePicker, setDisabledDatePicker] = useState(true);
  const [datePickerValue, setDatePickerValue] = useState(
    new Date().toISOString()
  );
  useEffect(() => {
    if (activeTheme === "system") {
      setActiveTheme(systemTheme || "light");
    }

    const palletMode = activeTheme === "dark" ? "dark" : "light";

    const newTheme = () =>
      createTheme({
        palette: {
          mode: palletMode,
        },
        components: {
          MuiTextField: {
            defaultProps: {
              size: "small",
              variant: "outlined",
            },
          },
        },
      });

    setTheme(newTheme);
    setDisabledDatePicker(false);
  }, [activeTheme]);

  // query alarms based on datePickerValue value
  const { data: alarms } = useQuery({
    queryKey: ["alarms", datePickerValue],
    queryFn: () => fetchAlarms({ time: datePickerValue }),
  });
  // console.log("alarms", alarms?.data);

  const tableData =
    alarms?.data?.map((alarm: any) => ({
      id: alarm?.z_timestamp,
      status: alarm?.alarm,
      plant: alarm?.plantName,
      device: alarm?.deviceName,
      openedTime: alarm?.z_timestamp,
    })) || [];

  return (
    <Card shadow="sm" className="p-5">
      <CardHeader>
        <div className="w-full">
          <p className="font-semibold">Alarm List</p>
          {/* <p className="text-sm font-medium text-foreground-400">
            Subtitle alarm list
          </p> */}
        </div>
      </CardHeader>

      <CardBody>
        <div className="w-fit mb-4">
          {!disabledDatePicker && (
            <ThemeProvider theme={theme}>
              <DatePicker
                value={new Date(datePickerValue)}
                onChange={(value) =>
                  setDatePickerValue(value?.toISOString() as any)
                }
              />
            </ThemeProvider>
          )}
        </div>

        <DataTable data={tableData} columns={columns} />
      </CardBody>

      <CardFooter></CardFooter>
    </Card>
  );
}
