import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import { CloudDrizzle, Sunrise, Sunset, Wind } from "lucide-react";
import PlantProduction from "./plant-production";
import PlantLocation from "./plant-location";
import PlantWeather from "./plant-weather";
import PlantHistory from "./plant-history";
import PlantSubsystem from "./plant-sub-system";
import PlantInverterRankings from "./plant-inverter-rankings";
import PlantPlannedProduction from "./plant-planned-production";
import PlantWorkOrder from "./plant-work-order";
import PlantBenefits from "./plant-benefits";
import PlantSystemSummary from "./plant-system-summary";
import "./loading.css";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function PlantContent({ data }: { data: any[] }) {
  function getPowerYield(field: "dpy" | "mpy" | "tpy") {
    if (field === "tpy") {
      let powerYield = data?.[0]?.[field];
      return Math.floor(powerYield * 12 * 1000) / 1000; // 12 is static value
    }

    let powerYield = data?.[0]?.[field];
    return Math.floor(powerYield * 1000) / 1000;
  }

  function getProduction() {
    let production = data?.[0]?.ap;
    return Math.floor(Number(production) * 100) / 100;
  }

  function getCapacity() {
    let capacity = data?.[0]?.capacity;
    return Math.floor(Number(capacity) * 100) / 100;
  }

  function getPower() {
    let production = getProduction();
    let capacity = getCapacity();
    return capacity / production;
  }

  return (
    <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 2xl:grid-cols-4 gap-3">
      <div className="col-span-4">
        <Card>
          <div className="grid grid-cols-7 gap-4 pt-6 rounded-xl">
            <div className="col-start-2 col-span-4 pr-2">
              <div className="flex content-center items-start p-8">
                <div className="text-2xl font-semibold justify-self-center p-2	">
                  Status:
                </div>
                <div className="bg-green-100 rounded-lg flex flex-row p-2 shadow-xl shadow-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="green"
                    className="w-7 h-7 justify-self-center	"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div className="text-xl justify-self-center ml-2	">Normal</div>
                </div>
              </div>

              <Image
                src="/img_0.png"
                alt="Vercel Logo"
                className="dark:invert  "
                width={180}
                height={240}
                priority
              />
            </div>

            <div className="col-start-4 col-end-6  font-sans col-span-1">
              <div className="flex flex-row">
                <div className="ml-4">
                  <div className="text-3xl text-slate-600">Real-time Power</div>
                  <div className="pt-2 flex flex-row justify-self-center">
                    <div className="text-3xl font-bold underline decoration-dotted ">
                      {getProduction()}{" "}
                    </div>
                    <div className="text-2xl font-semibold self-end pl-2">
                      kW
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-start-6 col-end-8  font-sans col-span-1">
              <div className="flex flex-row">
                <div className="ml-4">
                  <div className="text-3xl text-slate-600">Installed Power</div>
                  <div className="pt-2 flex flex-row justify-self-center">
                    <div className="text-3xl font-bold underline decoration-dotted ">
                      {getCapacity()}{" "}
                    </div>
                    <div className="text-2xl font-semibold self-end pl-2">
                      kWp
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Image
              src="/img_1.png"
              alt="Vercel Logo"
              className="dark:invert col-start-1 col-end-3 pl-6 pt-6"
              width={180}
              height={240}
              priority
            />
            <div className="dark:invert col-end-4 col-span-1 pb-6 mb-2 ">
              <div className="flex flex-row">
                <Image
                  src="/img_3.png"
                  alt="Vercel Logo"
                  className="dark:invert col-end-4 col-span-1 pb-6 mb-2 "
                  width={98}
                  height={10}
                  priority
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="col-span-1">
        <PlantLocation />
      </div>

      <div className="col-span-2">
        <PlantProduction data={data} />
      </div>

      <div className="lg:col-span-3 2xl:col-span-1">
        <PlantWeather />
      </div>

      <div className="col-span-4">
        <PlantHistory />
      </div>

      <div className="col-span-4">
        <PlantSubsystem data={data} />
      </div>

      {/* <div className="col-span-2">
        <PlantInverterRankings />
      </div> */}

      <div className="col-span-4">
        <PlantPlannedProduction />
      </div>

      <div className="col-span-2">
        <PlantBenefits data={data} />
      </div>

      <div className="col-span-2">
        <PlantWorkOrder />
      </div>

      <div className="col-span-4">
        <PlantSystemSummary />
      </div>
    </div>
  );
}
