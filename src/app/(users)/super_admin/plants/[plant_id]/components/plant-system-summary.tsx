import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import HistoryChart from "./history-chart";
import {
  BadgeJapaneseYen,
  BarChart4,
  CalendarRange,
  CircleDollarSign,
  Cloud,
  Coins,
  EggFried,
  Router,
  Trees,
} from "lucide-react";
import InverterRankingsTable from "./inverter-rankings-table";
import colors from "tailwindcss/colors";
import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import CardLayout from "../../../dashboard/_components/card-layout";
import { Inverter } from "@/app/assets/SVGCollection";

function fetchPlantData(id: string) {
  return axios.get(`/api/tsdb/plant_data/${id}`);
}

export default function PlantSystemSummary() {
  const { plant_id } = useParams<{ plant_id: string }>();

  const {
    data: plantData,
    isLoading: isLoadingPlantData,
    error: plantDataError,
  } = useQuery({
    queryKey: ["plant_data", plant_id],
    queryFn: () => fetchPlantData(plant_id),
  });

  const summary = [
    {
      icon: <Inverter />,
      title: "Inverter 1",
      status: "Online",
      value: 2,
      alerts: 6
    },
    {
      icon: <Inverter />,
      title: "Inverter 2",
      status: "Online",
      value: 2,
      alerts: 6
    },
    {
      icon: <Inverter />,
      title: "Inverter 3",
      status: "Offline",
      value: 2,
      alerts: 6
    },
    {
      icon: <Inverter />,
      title: "Inverter 4",
      status: "Online",
      value: 2,
      alerts: 6
    },
    {
      icon: <Inverter />,
      title: "Inverter 5",
      status: "Offline",
      value: 2,
      alerts: 6
    }
  ]




  return (
    <CardLayout title="System Summary" className=" rounded-2xl dark:bg-[#262629] h-fit max-h-[600px]" >
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {
          summary.map((item, index) => {
            return (
              <div className={` px-4 lg:px-6 py-[18px] flex justify-between  items-center gap-6 rounded-xl ${item.status == "Online" ? "bg-[#3FC43A14] dark:bg-[#3FC43A14]" : "bg-[#F4F5F7] dark:bg-[#333338]"} `}>
                <div className="bg-white flex md:flex lg:hidden xl:flex  p-4 rounded-lg">
                {item.icon}
                </div>
                <div className={` w-full text-xs ${item.status == "Online" ? "text-[#3FC43A] dark:text-[#FFFFFFBF]" : "text-[#686868] dark:text-[#FFFFFFBF"} `}>
                  <p className="text-lg md:text-xl font-normal text-[#171717] dark:text-white">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <div className="flex  gap-2 items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${item.status == "Online" ? "bg-[#3FC43A]" : "bg-[#686868]"} `}></div><span>{item.value} {item.status}</span>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${item.status == "Online" ? "bg-[#3FC43A]" : "bg-[#686868]"} `}></div><span>{item.alerts} Alerts</span>
                    </div>
                  </div>
                </div>

              </div>


            )
          })
        }
      </div>


    </CardLayout>
    // <Card className="h-full">
    //   <CardHeader>
    //     <CardTitle>System Summary</CardTitle>
    //   </CardHeader>
    //   <CardContent className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2">
    //     <div className="font-light flex items-baseline space-x-3">
    //       <Router size={20} />
    //       <div>
    //         <div>
    //           Inverter{" "}
    //           <span className="text-xl font-bold">
    //             {plantData?.data?.[0]?.totalDevice}
    //           </span>
    //         </div>
    //         <div className="flex space-x-3">
    //           <div>
    //             <span className="text-xl font-bold">0</span> Offline
    //           </div>
    //           <div>
    //             <span className="text-xl font-bold">0</span> Alerts
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="font-light flex items-baseline space-x-3">
    //       <CalendarRange size={20} />
    //       <div>
    //         <div>
    //           Inverter{" "}
    //           <span className="text-xl font-bold">
    //             {plantData?.data?.[0]?.totalDevice}
    //           </span>
    //         </div>
    //         <div className="flex space-x-3">
    //           <div>
    //             <span className="text-xl font-bold">0</span> Offline
    //           </div>
    //           <div>
    //             <span className="text-xl font-bold">0</span> Alerts
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
