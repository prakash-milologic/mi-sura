"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportCard from "./_components/report-card";
import { PlantReport, StatisticsIcon } from "@/app/assets/SVGCollection";
import PlantReportComponent from "./_components/plant-report";
import StatisticsReportCard from "./statistics_report/_components/statistics-report-card";

export default function ReportingPage() {
  const [selectedTab, setSelectedTab] = React.useState("plant");

  return (
    <div className="px-2 pb-4 md:px-8 md:pb-20 ">
      <Tabs defaultValue="plant">
         
              <TabsList className="grid grid-cols-2 bg-transparent w-fit gap-2 p-0">
                <TabsTrigger onClick={() => setSelectedTab("plant")} className="bg-[#E4E8EB] text-[#818282] data-[state=active]:bg-white data-[state=active]:text-[#009848] data-[state=active]:shadow-none data-[state=active]:rounded-b-0  px-5 py-[17px] shadow-none border-none rounded-t-2xl	 rounded-b-0 shadow-none" style={{borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px",boxShadow:"none"}}  value="plant">
                 <PlantReport isCurrent = {selectedTab == "plant" ? true : false}  /> <span className="ml-3">Plant Report</span>
                  </TabsTrigger>
                <TabsTrigger onClick={() => setSelectedTab("statistics")}  className="bg-[#E4E8EB] text-[#818282] data-[state=active]:bg-white data-[state=active]:text-[#009848] data-[state=active]:shadow-none  px-5 py-[17px] shadow-none border-none rounded-t-2xl	 rounded-b-0 shadow-none" style={{borderBottomLeftRadius:"0px",borderBottomRightRadius:"0px",boxShadow:"none"}}  value="statistics">
                 <StatisticsIcon isCurrent = {selectedTab == "statistics" ? true : false} /> <span className="ml-3">Statistics Report</span>
                  </TabsTrigger>
              </TabsList>
          <TabsContent className="mt-[18px]" value="plant">
              <PlantReportComponent />
          </TabsContent>
          <TabsContent value="statistics" className="mt-[18px]" >
                <StatisticsReportCard />
          </TabsContent>
      </Tabs>
      </div>
  );
}
