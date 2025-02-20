"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from "@nextui-org/react";
// import { DatePicker } from "@nextui-org/date-picker";
import { CalendarIcon, ExportIcon, PrintIcon } from "@/app/assets/SVGCollection";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DateView } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import EnergyChart from "../energy-chart";
import {
  dayPlantCSVHeaders,
  monthPlantCSVHeaders,
  totalPlantCSVHeaders,
  yearPlantCSVHeaders,
} from "../export-csv-headers";
import {
  DayPlantReport,
  MonthPlantReport,
  TotalPlantReport,
  YearPlantReport
} from "./plant_report_table/columns";

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
  const [currentTab, setCurrentTab] = useState<DateView | "week" | "total">("month");

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
        case "week":
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
    <Card shadow="sm" className="h-[550px] rounded-none">
      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as DateView)}
        className=""
      >
        <CardHeader className="flex gap-2 justify-center flex-wrap px-6 py-4 border-b border-b-gray-200">
          <p className="text-[#171717] text-xl font-semibold">Device Analytics </p>
          <div className="flex gap-6 md:gap-2  justify-center flex-wrap">
          <TabsList className="flex gap-2 bg-transparent]">
            <TabsTrigger className="tab-item  text-xs md:text-sm  px-[20.5px] py-[9.5px] dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white dark:data-[state=active]:bg-[#009848]" value="day">Daily</TabsTrigger>
            <TabsTrigger className="tab-item  text-xs md:text-sm px-[20.5px] py-[9.5px] dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white dark:data-[state=active]:bg-[#009848]"  value="week">Weekly</TabsTrigger>
            <TabsTrigger className="tab-item  text-xs md:text-sm px-[20.5px] py-[9.5px] dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white dark:data-[state=active]:bg-[#009848]" value="month">Monthly</TabsTrigger>
            <TabsTrigger className="tab-item  text-xs md:text-sm px-[20.5px] py-[9.5px] dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white dark:data-[state=active]:bg-[#009848]"  value="year">Yearly</TabsTrigger>
          </TabsList>
          

          {!disabledDatePicker && (
            <ThemeProvider theme={theme}>
              <DatePicker
              className="bg-[#F4F5F7] text-[#171717] dark:bg-[#333338] rounded-md border-1 border-[#DCDCDC]"
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
                slots={
                  {
                    openPickerIcon: () => (
                    <CalendarIcon />
                    ),
                  }
                }
              />
            </ThemeProvider>
          )}
          </div>
         
        </CardHeader>
        <CardBody className="m-0 p-0" >
          <div className="flex justify-end items-center gap-4 px-6 pt-6">
              <div className="flex gap-2 cursor-pointer">
                <ExportIcon /><span className="text-sm font-semibold text-[#009848]">Export</span>
                </div>
                <div className="w-[1px] h-[25px] bg-[#1717171A]"></div>
                <div className="flex gap-2 cursor-pointer">
                <PrintIcon /><span className="text-sm font-semibold text-[#009848]">Print</span>
                </div>
          </div>
          {
            ["day", "week", "month", "year"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="h-[300px] lg:h-[430px]">
                  <EnergyChart />
                </div>
              </TabsContent>
            ))
          }
        </CardBody>
        <CardFooter></CardFooter>
      </Tabs>
    </Card>
  );
}
