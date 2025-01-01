"use client";
import { PlantList } from "@/app/assets/SVGCollection";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PlantListCardProps {
  location: string;
  max: number;
  value: number;
  status: string;
  name: string;
}

const PlantCard = ({ data, key }: { data: PlantListCardProps, key: number }) => {
  const percentage = (data.value / data.max) * 100 || undefined;
  const remaining = data.max - data.value;


  return (
    <div className={`flex ${data.status == "success" ? "bg-[#3FC43A14] dark:bg-[#3FC43A14]":"bg-[#F4F5F7] dark:bg-[#333338]"}  px-4 py-4 gap-6 items-center`}>
      <PlantList />
      <div className="flex gap-1" >
        <div>
          <p className="text-xl font-medium">{data.name}</p>
            <p className="text-sm mt-1 text-[#686868] dark:text-[#FFFFFFCC]">{data.location} </p>
          <div className="flex gap-[3px] mt-4 flex-wrap">
            { data.value > 0 &&
              Array.from({ length: data.value }, (_, index) => {
                console.log(data.value,index+1);
                return (
                  <div key={index} className={`w-4 h-4 rounded bg-[#3FC43A]`}></div>
                )
              }
              )
            }
              { remaining > 0 &&
              Array.from({ length: remaining }, (_, index) => {
                console.log(data.value,index+1);
                return (
                  <div key={index} className={`w-4 h-4 rounded bg-[#EDEDED]`}></div>
                )
              }
              )
            }
            <p className="ml-[9px] text-xs text-[#171717] dark:text-white font-medium">{data.value}/{data.max} installed</p>
          </div>
        </div>
  
      </div>
      <div className=" flex gap-2  items-center">
          <div className={`w-2 h-2 rounded-xl ${data.status == "success" ? "bg-[#3FC43A]" : "bg-[#686868]"} }`}></div>
          <span className={`text-sm ${data.status == "success" ? "text-[#3FC43A] " : "text-[#686868]"} `}>{data.status == "success" ? "Active" : "Inactive"}</span>
        </div>

      {/* <div className="flex gap-1">
        <DailyYieldIcon className="text-[#FDB216]" />
        <p className="text-base font-normal ">301 kW</p>
      </div> */}
    </div>
  );
};

function fetchPlants({ limit }: { limit: number }) {
  return axios.get(`/api/tsdb/plants_watch_list?limit=${limit}`);
}

export default function PlantListCard() {
  const plantsLimit = 6;
  const { data: plantsWatchList, isLoading: isLoadingPlantsWatchList } =
    useQuery({
      queryKey: ["plants_watch_list", { limit: plantsLimit }],
      queryFn: () => fetchPlants({ limit: plantsLimit }),
      refetchInterval: 30000,
    });

  const plantsData =
    plantsWatchList?.data?.map((plant: any) => ({
      name: plant?.name,
      location: plant?.address,
      status: plant?.isActive ? "success" : "danger",
      value: plant?.totalDevice,
      max: plant?.totalDevice,
    })) || [];

  return (
    <Card shadow="sm" className="h-[446px] rounded-2xl dark:bg-[#262629]">
      <CardHeader className="border-b-1 dark:border-b-[#FFFFFF1A] p-6">
        <div className="flex items-center justify-between w-full ">
          <p className="font-semibold">Plant List</p>
          <Link href="/super_admin/plants" className="text-sm font-medium px-[15px] py-[9.5px] text-[#009848] border border-[#009848] rounded-[8px]">
            View All
          </Link>
        </div>
      </CardHeader>

      <CardBody className="p-6 flex flex-col gap-2">
        {isLoadingPlantsWatchList ? (
          <div>Loading...</div>
        ) : (
          plantsData.map((plant: any, index: any) => (
            <PlantCard key={index} data={plant} />
          ))
        )}
      </CardBody>

      <CardFooter></CardFooter>
    </Card>
  );
}
