"use client";
import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Progress,
} from "@nextui-org/react";
import { Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const plants = [
//   {
//     name: "Greenbase Solution (MIMOS)",
//     location: "Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia",
//     status: "success",
//     value: 1,
//     max: 1,
//   },
//   // {
//   //   name: "Plant 2",
//   //   location: "Kedah",
//   //   status: "success",
//   //   value: 1,
//   //   max: 1,
//   // },
//   // {
//   //   name: "Plant C",
//   //   location: "Kuala Siput, Johor",
//   //   status: "warning",
//   //   value: 5,
//   //   max: 10,
//   // },
// ];

const CardItem = ({ data }: { data: any }) => {
  const percentage = (data.value / data.max) * 100 || undefined;

  return (
    <Card shadow="none" className="border-2 border-dashed">
      <CardHeader className="space-x-3">
        <Zap />
        <div>
          <p className="font-semibold text-sm">{data.name}</p>
          <p className="text-sm font-medium text-foreground-400">
            {data.location}
          </p>
        </div>
      </CardHeader>

      <CardBody>
        <Progress
          aria-label="Loading..."
          label={`${data.value}/${data.max}`}
          color={data.status}
          showValueLabel
          value={percentage}
          classNames={{
            label: "font-semibold text-sm",
            value: "font-semibold text-sm text-foreground-400",
          }}
          className="max-w-full"
        />
      </CardBody>

      <CardFooter></CardFooter>
    </Card>
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
    <Card shadow="sm" className="h-[550px] p-5 ">
      <CardHeader>
        <div className="flex items-center justify-between w-full ">
          <div>
            <p className="font-semibold">Plant List</p>
            <p className="text-sm font-medium text-foreground-400">
              List of the plants
            </p>
          </div>
          {/* <Link size="sm" href="#">
            All List
          </Link> */}
        </div>
      </CardHeader>

      <CardBody>
        <div className="space-y-5">
          {isLoadingPlantsWatchList ? (
            <div>Loading...</div>
          ) : (
            plantsData.map((plant: any, index: any) => (
              <CardItem key={index} data={plant} />
            ))
          )}
        </div>
      </CardBody>

      <CardFooter></CardFooter>
    </Card>
  );
}
