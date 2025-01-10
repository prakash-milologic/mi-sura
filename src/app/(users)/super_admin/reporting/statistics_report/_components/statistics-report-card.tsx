"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker, DateView } from "@mui/x-date-pickers";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
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
import ProductionCard from "../../../dashboard/_components/production-card";
import StaticsCard from "../../_components/statistics-card";

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
    ? "0"
    : Math.floor((currentYield / 10) * 1000) / 1000;

  let totalYield = statisticsReport?.data?.totalYield;
  totalYield = !totalYield
    ? "0"
    : Math.floor(totalYield * 0.001 * 1000) / 1000;

  const getCurrentCO2Reduction = () => {
    const currentYield = statisticsReport?.data?.currentYield;
    const energyCommission = 0.78 - 0.035; // static value refer to energy comission given by mimos
    const result =
      Math.floor((currentYield / 10) * energyCommission * 1000) / 1000;
    return !result ? "0" : String(result);
  };

  const getTotalCO2Reduction = () => {
    const totalYield = statisticsReport?.data?.totalYield;
    const energyCommission = 0.78 - 0.035; // static value refer to energy comission given by mimos
    const result =
      Math.floor((totalYield / 10) * energyCommission * 1000) / 1000;
    return !result ? "0" : String(result);
  };

  const getCurrentRevenue = () => {
    const currentYield = statisticsReport?.data?.currentYield;
    const tariff = 0.57; // static value refer to tariff given by mimos
    const result = Math.floor((currentYield / 10) * tariff * 1000) / 1000;
    return !result ? "0" : String(result);
  };

  const getTotalRevenue = () => {
    const totalYield = statisticsReport?.data?.totalYield;
    const tariff = 0.57; // static value refer to tariff given by mimos
    const result = Math.floor((totalYield / 10) * tariff * 1000) / 1000;
    return !result ? "0" : String(result);
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
  interface ProductionCardProps {
    title: string;
    content: string;
    descTitle: string;
    descContent: string;
    className: string;
    chipcolor: string;
    icon?: React.ReactNode;
    imageSrc?: string;
    titleStyle?: string;
    contentStyle?: string;
    borderColor: string;
  }

  const productionCardDetails: ProductionCardProps[] = [
    {
      title: `${currentTab == "day" ? "Daily" : currentTab == "month" ? "Monthly" : currentTab == "year" ? "Yearly" : "Total"} Yield`,
      content: currentYield + " kWh",
      descTitle: "Total (MWh)",
      descContent: totalYield + " MWh",
      className: "bg-[#058DF70D] px-4 pt-4 pb-3 md:px-8 md:pt-8 lg:pb-6  dark:bg-[#058DF726]",
      chipcolor: "bg-[#058DF7] text-white ",
      titleStyle: "text-[#171717BF] text-base lg:text-lg font-medium",
      contentStyle: "text-[#058DF7] text-xl md:text-[40px] font-semibold",
      borderColor: "border-b-[#058DF733]"
    },
    {
      title: `${currentTab == "day" ? "Daily" : currentTab == "month" ? "Monthly" : currentTab == "year" ? "Yearly" : "Total"} CO2 Reduction`,
      content: getCurrentCO2Reduction() + " kg",
      descTitle: "Total (kg)",
      descContent: getTotalCO2Reduction() + " kg",
      className: "bg-[#FD686A0D] px-4 pt-4 pb-3 md:px-8 md:pt-8 lg:pb-6  dark:bg-[#FD686A26]",
      chipcolor: "bg-[#FD686A] text-white ",
      titleStyle: "text-[#171717BF] text-base lg:text-lg font-medium",
      contentStyle: "text-[#FD686A] text-xl md:text-[40px] font-semibold",
      borderColor: "border-b-[#FD686A33]"
    },
    {
      title: `${currentTab == "day" ? "Daily" : currentTab == "month" ? "Monthly" : currentTab == "year" ? "Yearly" : "Total"}  Revenue`,
      content: getCurrentRevenue() + " MYR",
      descTitle: "Total (MYR)",
      descContent: getTotalRevenue() + " MYR",
      className: "bg-[#D55BC90D] px-4 pt-4 pb-3 md:px-8 md:pt-8 lg:pb-6  dark:bg-[#D55BC926]",
      chipcolor: "bg-[#D55BC9] text-white ",
      titleStyle: "text-[#171717BF] text-base lg:text-lg font-medium",
      contentStyle: "text-[#D55BC9] text-base md:text-[40px] font-semibold",
      borderColor: "border-b-[#D55BC933]"
    },


  ];

  return (
    <Card shadow="sm" className="rounded-none shadow-none dark:bg-[#262629] p-0 ">
      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as DateView)}
      >
        <CardHeader className="flex flex-col xl:flex-row gap-2  justify-between px-2 py-4 md:px-6 md:py-8 m-0  border-b border-[#1717171A] dark:border-[#FFFFFF1A]">
          <div>
            <p className=" text-2xl md:text-[32px] dark:text-white text-center xl:text-left font-semibold text-[#171717]">Statistics Report </p>
            <p className=" text-xs md:text-sm text-[#686868] dark:text-white/80 font-normal mt-1">Information regarding yield, installed power, revenue, and CO₂ reduction.</p>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-2 items-center stat-item  justify-center">
            <TabsList className="flex flex-wrap gap-2 bg-transparent] justify-center">
              <TabsTrigger className="tab-item px-[20.5px] py-[9.5px] dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white dark:data-[state=active]:bg-[#009848] " value="day">Daily</TabsTrigger>
              <TabsTrigger className="tab-item px-[20.5px] py-[9.5px] dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white  dark:data-[state=active]:bg-[#009848]" value="month">Monthly</TabsTrigger>
              <TabsTrigger className="tab-item px-[20.5px] py-[9.5px] dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white  dark:data-[state=active]:bg-[#009848]" value="year">Yearly</TabsTrigger>
              <TabsTrigger className="tab-item px-[20.5px] py-[9.5px] dark:text-white/65 dark:bg-[#333338] dark:data-[state=active]:text-white  dark:data-[state=active]:bg-[#009848]" value="total">Total</TabsTrigger>
            </TabsList>

            {!disabledDatePicker && (
              <ThemeProvider theme={theme}>
                <DatePicker
                className="bg-[#F4F5F7]  custom-datepicker text-[#171717] dark:bg-[#333338] rounded-md border-1 border-[#DCDCDC]"
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
          </div>

          </CardHeader>

        <CardBody className="p-0 m-0  border-b border-[#1717171A] dark:border-[#FFFFFF1A]">
          {["day", "month", "year", "total"].map((item, index) => {
            return (
              <TabsContent value={item} key={index} className="p-0 m-0">
                <div className=" p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 dark:text-white">
                  {
                    productionCardDetails.map((card, index) => (
                      <StaticsCard
                        key={index}
                        title={card.title}
                        content={card.content}
                        descTitle={card.descTitle}
                        descContent={card.descContent}
                        className={card.className}
                        chipColor={card.chipcolor}
                        titleStyle={card.titleStyle}
                        contentStyle={card.contentStyle}
                        borderColor={card.borderColor}
                      />
                    ))
                  }
                </div>
              </TabsContent>
            )
          })}

          {/* <TabsContent value="month">
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
                    primaryBodyValue={currentYield}
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
          </TabsContent> */}

        </CardBody>
        <CardFooter className="m-0 p-0 justify-center">
          <StatisticsTableContainer
            setStatisticsPlantsData={setStatisticsPlantsData}
            currentTab={currentTab}
            datePickerValue={datePickerValue}
          />
        </CardFooter>
      </Tabs>
    </Card>
  );
}


          {/* <div className="w-full flex items-center justify-end">
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
          </div> */}