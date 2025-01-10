"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportCard from "./_components/report-card";
import { ExportIcon, PlantReport, PrintIcon, StatisticsIcon } from "@/app/assets/SVGCollection";
import PlantReportComponent from "./_components/plant-report-component/plant-report";
import StatisticsReportCard from "./_components/statistics-report-component/statistics-report-card";
import { CSVLink } from "react-csv";

export default function ReportingPage() {
  const [selectedTab, setSelectedTab] = React.useState("plant");
  const [exportData, setExportData] = React.useState({currentStatisticsHeaders: [],currentStatisticsData: []});
  const [exportFileName, setExportFileName] = React.useState("");
  const [statisticsPlantsData, setStatisticsPlantsData] = React.useState<
    any[] | undefined
  >(undefined);
  
  return (
    <div className="px-2 pb-4 md:px-8 md:pb-20 ">
      <Tabs defaultValue="plant">

        <TabsList className="flex justify-between bg-transparent gap-2 p-0">
          <div className="grid grid-cols-2 gap-2 w-fit">
            <TabsTrigger onClick={() => setSelectedTab("plant")} className="col-span-1 bg-[#E4E8EB] text-[#818282] data-[state=active]:bg-white data-[state=active]:text-[#009848] data-[state=active]:shadow-none data-[state=active]:rounded-b-0  px-5 py-[17px] shadow-none border-none rounded-t-2xl	 rounded-b-0 shadow-none" style={{ borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", boxShadow: "none" }} value="plant">
              <PlantReport isCurrent={selectedTab == "plant" ? true : false} /> <span className="ml-3">Plant Report</span>
            </TabsTrigger>
            <TabsTrigger onClick={() => setSelectedTab("statistics")} className="col-span-1 bg-[#E4E8EB] text-[#818282] data-[state=active]:bg-white data-[state=active]:text-[#009848] data-[state=active]:shadow-none  px-5 py-[17px] shadow-none border-none rounded-t-2xl	 rounded-b-0 shadow-none" style={{ borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", boxShadow: "none" }} value="statistics">
              <StatisticsIcon isCurrent={selectedTab == "statistics" ? true : false} /> <span className="ml-3">Statistics Report</span>
            </TabsTrigger>
          </div>
          {selectedTab == "statistics" && <div className="flex justify-end items-center gap-2 sm:gap-4 px-2 sm:px-6 ">
              <CSVLink
              className="flex gap-[2px] sm:gap-2 cursor-pointer"
                              filename={exportFileName}
                              data={exportData?.currentStatisticsData || []}
                              headers={
                                exportData?.currentStatisticsHeaders || []
                              }
                              onClick={() => {
                                if (statisticsPlantsData) return true;
                                return false;
                              }}
                            >
                             <ExportIcon /><span className="text-sm font-semibold text-[#009848] hidden sm:block">Export</span>
                            </CSVLink>
            <div className="w-[1px] h-[25px] bg-[#1717171A]"></div>
            <div className="flex gap-2 cursor-pointer">
              <PrintIcon /><span className="text-sm font-semibold text-[#009848] hidden sm:block">Print</span>
            </div>
          </div>}
        </TabsList>
        <TabsContent value="plant">
          <PlantReportComponent />
        </TabsContent>
        <TabsContent value="statistics"  >
          <StatisticsReportCard  setCurrentStatics= {setExportData} setDefaultFileName={setExportFileName} statisticsPlantsData={statisticsPlantsData} setStatisticsPlantsData={setStatisticsPlantsData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
