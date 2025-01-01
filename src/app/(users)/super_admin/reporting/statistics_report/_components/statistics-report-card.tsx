"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker, DateView } from "@mui/x-date-pickers";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import InfoCard from "./info-card";
import {
  DayStatisticsReport,
  MonthStatisticsReport,
  TotalStatisticsReport,
  YearStatisticsReport,
  dayStatisticsColumns,
  monthStatisticsColumns,
  totalStatisticsColumns,
  yearStatisticsColumns,
} from "./statistics_report_table/columns";
import { DataTable } from "./statistics_report_table/data-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import {
  dayStatisticsCSVHeaders,
  monthStatisticsCSVHeaders,
  totalStatisticsCSVHeaders,
  yearStatisticsCSVHeaders,
} from "./export-csv-headers";
import { Button } from "@/components/ui/button";
import StatisticsTableContainer from "./statistics-table-container";
import { format } from "date-fns";

function fetchStatisticsReport({
  period,
  time,
}: {
  period: string;
  time: string;
}) {
  return axios.get(`/api/tsdb/statistics_report?period=${period}&time=${time}`);
}

export default function StatisticsReportCard() {
  const [currentTab, setCurrentTab] = useState<DateView | "total">("day");
  const [datePickerValue, setDatePickerValue] = useState(
    new Date().toISOString()
  );
  const {
    data: statisticsReport,
    isLoading: isLoadingStatisticsReport,
    error: errorStatisticsReport,
    refetch: refetchStatisticsReport,
  } = useQuery({
    queryKey: ["statistics_report", currentTab, datePickerValue],
    queryFn: () =>
      fetchStatisticsReport({ period: currentTab, time: datePickerValue }),
  });

  const getFilenameExport = () => {
    const defaultName = "Statistics Report";
    if (currentTab === "day")
      return `${defaultName} ${format(datePickerValue, "dd MMM yyyy")}`;
    if (currentTab === "month")
      return `${defaultName} ${format(datePickerValue, "MMM yyyy")}`;
    if (currentTab === "year")
      return `${defaultName} ${format(datePickerValue, "yyyy")}`;
    if (currentTab === "total") return `${defaultName} Total`;
    return defaultName;
  };

  let currentYield = statisticsReport?.data?.currentYield;
  currentYield = !currentYield
    ? "--"
    : Math.floor((currentYield / 10) * 1000) / 1000;

  let totalYield = statisticsReport?.data?.totalYield;
  totalYield = !totalYield
    ? "--"
    : Math.floor(totalYield * 0.001 * 1000) / 1000;

  const getCurrentCO2Reduction = () => {
    const currentYield = statisticsReport?.data?.currentYield;
    const energyCommission = 0.78 - 0.035; // static value refer to energy comission given by mimos
    const result =
      Math.floor((currentYield / 10) * energyCommission * 1000) / 1000;
    return !result ? "--" : String(result);
  };

  const getTotalCO2Reduction = () => {
    const totalYield = statisticsReport?.data?.totalYield;
    const energyCommission = 0.78 - 0.035; // static value refer to energy comission given by mimos
    const result =
      Math.floor((totalYield / 10) * energyCommission * 1000) / 1000;
    return !result ? "--" : String(result);
  };

  const getCurrentRevenue = () => {
    const currentYield = statisticsReport?.data?.currentYield;
    const tariff = 0.57; // static value refer to tariff given by mimos
    const result = Math.floor((currentYield / 10) * tariff * 1000) / 1000;
    return !result ? "--" : String(result + " MYR");
  };

  const getTotalRevenue = () => {
    const totalYield = statisticsReport?.data?.totalYield;
    const tariff = 0.57; // static value refer to tariff given by mimos
    const result = Math.floor((totalYield / 10) * tariff * 1000) / 1000;
    return !result ? "--" : String(result + " MYR");
  };

  const [statisticsPlantsData, setStatisticsPlantsData] = useState<
    any[] | undefined
  >(undefined);

  const getCurrentStatisticsCSVProps = () => {
    const currentStatisticsData = statisticsPlantsData || [];
    let currentStatisticsHeaders = dayStatisticsCSVHeaders;

    switch (currentTab) {
      case "month":
        currentStatisticsHeaders = monthStatisticsCSVHeaders;
        break;
      case "year":
        currentStatisticsHeaders = yearStatisticsCSVHeaders;
        break;
      case "total":
        currentStatisticsHeaders = totalStatisticsCSVHeaders;
        break;
      default:
        break;
    }
    return { currentStatisticsData, currentStatisticsHeaders };
  };

  const [disabledDatePicker, setDisabledDatePicker] = useState(true);
  const [currentDatePickerViews, setCurrentDatePickerViews] = useState<
    DateView[] | undefined
  >(undefined);

  useEffect(() => {
    setDisabledDatePicker(false);
    setDatePickerValue(new Date().toISOString());
    setStatisticsPlantsData(undefined);

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

  return (
    <Card shadow="sm" className="h-[550px]">
      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as DateView)}
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
                !statisticsPlantsData ? "pointer-events-none opacity-50" : ""
              }
            >
              <CSVLink
                filename={getFilenameExport()}
                data={getCurrentStatisticsCSVProps().currentStatisticsData}
                headers={
                  getCurrentStatisticsCSVProps().currentStatisticsHeaders
                }
                onClick={() => {
                  if (statisticsPlantsData) return true;
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
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-x-2">
                <div className="col-span-1">
                  <InfoCard
                    title="Yield"
                    primaryBodyTitle="Today(kWh)"
                    primaryBodyValue={currentYield}
                    secondaryBodyTitle="Total(MWh)"
                    secondaryBodyValue={totalYield}
                  />
                </div>

                <div className="col-span-1">
                  <InfoCard
                    title="CO2 Reduction"
                    primaryBodyTitle="Today(kg)"
                    primaryBodyValue={getCurrentCO2Reduction()}
                    secondaryBodyTitle="Total(kg)"
                    secondaryBodyValue={getTotalCO2Reduction()}
                  />
                </div>

                <div className="col-span-2">
                  <InfoCard
                    title="Revenue"
                    primaryBodyTitle="Today"
                    primaryBodyValue={getCurrentRevenue()}
                    secondaryBodyTitle="Cumulative Total Revenue"
                    secondaryBodyValue={getTotalRevenue()}
                  />
                </div>
              </div>

              <StatisticsTableContainer
                setStatisticsPlantsData={setStatisticsPlantsData}
                currentTab={currentTab}
                datePickerValue={datePickerValue}
              />
            </div>
          </TabsContent>

          <TabsContent value="month">
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-x-2">
                <div className="col-span-1">
                  <InfoCard
                    title="Yield"
                    primaryBodyTitle="Current Month(kWh)"
                    primaryBodyValue={currentYield}
                    secondaryBodyTitle="Total(MWh)"
                    secondaryBodyValue={totalYield}
                  />
                </div>

                <div className="col-span-1">
                  <InfoCard
                    title="CO2 Reduction"
                    primaryBodyTitle="Current Month(kg)"
                    primaryBodyValue={getCurrentCO2Reduction()}
                    secondaryBodyTitle="Total(kg)"
                    secondaryBodyValue={getTotalCO2Reduction()}
                  />
                </div>

                <div className="col-span-2">
                  <InfoCard
                    title="Revenue"
                    primaryBodyTitle="Current Month"
                    primaryBodyValue={getCurrentRevenue()}
                    secondaryBodyTitle="Cumulative Total Revenue"
                    secondaryBodyValue={getTotalRevenue()}
                  />
                </div>
              </div>

              <StatisticsTableContainer
                setStatisticsPlantsData={setStatisticsPlantsData}
                currentTab={currentTab}
                datePickerValue={datePickerValue}
              />
            </div>
          </TabsContent>

          <TabsContent value="year">
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-x-2">
                <div className="col-span-1">
                  <InfoCard
                    title="Yield"
                    primaryBodyTitle="This year(kWh)"
                    primaryBodyValue={currentYield}
                    secondaryBodyTitle="Total(MWh)"
                    secondaryBodyValue={totalYield}
                  />
                </div>

                <div className="col-span-1">
                  <InfoCard
                    title="CO2 Reduction"
                    primaryBodyTitle="This year(kg)"
                    primaryBodyValue={getCurrentCO2Reduction()}
                    secondaryBodyTitle="Total(kg)"
                    secondaryBodyValue={getTotalCO2Reduction()}
                  />
                </div>

                <div className="col-span-2">
                  <InfoCard
                    title="Revenue"
                    primaryBodyTitle="This year"
                    primaryBodyValue={getCurrentRevenue()}
                    secondaryBodyTitle="Cumulative Total Revenue"
                    secondaryBodyValue={getTotalRevenue()}
                  />
                </div>
              </div>

              <StatisticsTableContainer
                setStatisticsPlantsData={setStatisticsPlantsData}
                currentTab={currentTab}
                datePickerValue={datePickerValue}
              />
            </div>
          </TabsContent>

          <TabsContent value="total">
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-x-2">
                <div className="col-span-1">
                  <InfoCard
                    title="Yield"
                    primaryBodyTitle="Total(MWh)"
                    primaryBodyValue={totalYield}
                    secondaryBodyTitle=""
                    secondaryBodyValue={""}
                  />
                </div>

                <div className="col-span-1">
                  <InfoCard
                    title="CO2 Reduction"
                    primaryBodyTitle="Total(kg)"
                    primaryBodyValue={getTotalCO2Reduction()}
                    secondaryBodyTitle=""
                    secondaryBodyValue={""}
                  />
                </div>

                <div className="col-span-2">
                  <InfoCard
                    title="Revenue"
                    primaryBodyTitle="Cumulative Total Revenue"
                    primaryBodyValue={getTotalRevenue()}
                    secondaryBodyTitle=""
                    secondaryBodyValue={""}
                  />
                </div>
              </div>

              <StatisticsTableContainer
                setStatisticsPlantsData={setStatisticsPlantsData}
                currentTab={currentTab}
                datePickerValue={datePickerValue}
              />
            </div>
          </TabsContent>
        </CardBody>
        <CardFooter></CardFooter>
      </Tabs>
    </Card>
  );
}
