"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
// import { DatePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import { add, format, formatISO } from "date-fns";
import { useEffect, useState } from "react";
import { DataTable } from "./plant_report_table/data-table";
import {
  DayPlantReport,
  MonthPlantReport,
  TotalPlantReport,
  YearPlantReport,
  totalColumns,
  dayColumns,
  monthColumns,
  yearColumns,
} from "./plant_report_table/columns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { DateView } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CSVLink } from "react-csv";
import { Button } from "@/components/ui/button";
import {
  dayPlantCSVHeaders,
  monthPlantCSVHeaders,
  totalPlantCSVHeaders,
  yearPlantCSVHeaders,
} from "./export-csv-headers";

function fetchPlantReport({
  plantId,
  period,
  time,
}: {
  plantId: number | null;
  period: string;
  time: string;
}) {
  return axios.get(
    `/api/tsdb/plant_report/${plantId}?period=${period}&time=${time}`
  );
}

export default function PlantReportCard({
  selectedPlant,
}: {
  selectedPlant: number | null;
}) {
  const [datePickerValue, setDatePickerValue] = useState(
    new Date().toISOString()
  );
  const [currentTab, setCurrentTab] = useState<DateView | "total">("day");

  const {
    data: plantReport,
    isLoading: isLoadingPlantReport,
    error: errorPlantReport,
    refetch: refetchPlantReport,
  } = useQuery({
    queryKey: ["plant_report", selectedPlant, currentTab, datePickerValue],
    queryFn: () =>
      fetchPlantReport({
        plantId: selectedPlant,
        period: currentTab,
        time: datePickerValue,
      }),
    enabled: !!selectedPlant,
  });

  const getFilenameExport = () => {
    const defaultName = "Plant Report";
    if (currentTab === "day")
      return `${defaultName} ${format(datePickerValue, "dd MMM yyyy")}`;
    if (currentTab === "month")
      return `${defaultName} ${format(datePickerValue, "MMM yyyy")}`;
    if (currentTab === "year")
      return `${defaultName} ${format(datePickerValue, "yyyy")}`;
    if (currentTab === "total") return `${defaultName} Total`;
    return defaultName;
  };

  const dayPlantData =
    plantReport?.data?.map((d: any) => ({
      id: d?.time,
      name: d?.plantName,
      time: new Date(d?.time),
      dailyYield: d?.currentYield,
      totalYield: d?.totalYield,
    })) || [];

  const monthPlantData =
    plantReport?.data?.map((d: any) => ({
      id: d?.time,
      name: d?.plantName,
      time: new Date(d?.time),
      dailyYield: d?.currentYield,
      totalYield: d?.totalYield,
    })) || [];

  const yearPlantData =
    plantReport?.data?.map((d: any) => ({
      id: d?.time,
      name: d?.plantName,
      time: new Date(d?.time),
      monthlyYield: d?.currentYield,
      totalYield: d?.totalYield,
    })) || [];

  const totalPlantData =
    plantReport?.data?.map((d: any) => ({
      id: d?.time,
      name: d?.plantName,
      time: new Date(d?.time),
      annualYield: d?.currentYield,
      totalYield: d?.totalYield,
    })) || [];

  const getCurrentPlantCSVProps = () => {
    let currentPlantData:
      | DayPlantReport[]
      | MonthPlantReport[]
      | YearPlantReport[]
      | TotalPlantReport[] = dayPlantData?.map((d: any) => ({
      ...d,
      time: new Date(d?.time).toLocaleString(),
    }));

    let currentPlantHeaders = dayPlantCSVHeaders;

    switch (currentTab) {
      case "month":
        currentPlantData = monthPlantData?.map((d: any) => ({
          ...d,
          time: new Date(d?.time).toLocaleDateString(),
        }));

        currentPlantHeaders = monthPlantCSVHeaders;
        break;
      case "year":
        currentPlantData = yearPlantData?.map((d: any) => ({
          ...d,
          time: format(d?.time, "MMM/yyyy"),
        }));
        currentPlantHeaders = yearPlantCSVHeaders;
        break;
      case "total":
        currentPlantData = totalPlantData?.map((d: any) => ({
          ...d,
          time: d?.time?.getFullYear(),
        }));
        currentPlantHeaders = totalPlantCSVHeaders;
        break;
      default:
        break;
    }

    return { currentPlantData, currentPlantHeaders };
  };

  const {
    theme: activeTheme,
    setTheme: setActiveTheme,
    systemTheme,
  } = useTheme();
  const [theme, setTheme] = useState(() => createTheme());

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
  }, [activeTheme]);

  const [disabledDatePicker, setDisabledDatePicker] = useState(true);
  const [currentDatePickerViews, setCurrentDatePickerViews] = useState<
    DateView[] | undefined
  >(undefined);

  useEffect(() => {
    setDisabledDatePicker(false);
    setDatePickerValue(new Date().toISOString());

    switch (currentTab) {
      case "day":
        setCurrentDatePickerViews(undefined);
        break;
      case "month":
        setCurrentDatePickerViews(["month", "year"]);
        break;
      case "year":
        setCurrentDatePickerViews(["year"]);
        break;
      default:
        setDisabledDatePicker(true);
        break;
    }
  }, [currentTab]);

  return (
    <Card shadow="sm" className="h-[550px] rounded-l-none">
      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as DateView)}
        className=""
      >
        <CardHeader className="flex gap-3">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="total">Total</TabsTrigger>
          </TabsList>

          {!disabledDatePicker && (
            <ThemeProvider theme={theme}>
              <DatePicker
                disableFuture
                value={new Date(datePickerValue)}
                views={currentDatePickerViews}
                onChange={(value, ctx) => {
                  const currentDate = new Date();
                  if (ctx.validationError === "invalidDate") {
                    setDatePickerValue(currentDate.toISOString());
                    return;
                  }
                  if (value && value > currentDate) {
                    setDatePickerValue(currentDate.toISOString());
                    return;
                  }
                  setDatePickerValue(value?.toISOString() as any);
                }}
              />
            </ThemeProvider>
          )}

          <div className="w-full flex items-center justify-end">
            <Button
              asChild
              variant={"outline"}
              className={
                !plantReport?.data?.length
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            >
              <CSVLink
                filename={getFilenameExport()}
                data={getCurrentPlantCSVProps().currentPlantData}
                headers={getCurrentPlantCSVProps().currentPlantHeaders}
                onClick={() => {
                  if (plantReport?.data?.length) return true;
                  return false;
                }}
              >
                Export
              </CSVLink>
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <TabsContent value="day">
            <DataTable columns={dayColumns} data={dayPlantData} />
          </TabsContent>

          <TabsContent value="month">
            <DataTable columns={monthColumns} data={monthPlantData} />
          </TabsContent>

          <TabsContent value="year">
            <DataTable columns={yearColumns} data={yearPlantData} />
          </TabsContent>

          <TabsContent value="total">
            <DataTable columns={totalColumns} data={totalPlantData} />
          </TabsContent>
        </CardBody>
        <CardFooter></CardFooter>
      </Tabs>
    </Card>
  );
}
