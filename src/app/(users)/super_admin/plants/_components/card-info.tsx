import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Chip,
  CardProps,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronUp,
  DatabaseZap,
  LucideIcon,
  MinusCircle,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import CardInfoChart from "./card-info-chart";
import CardInfoLegend from "./card-info-legend";

export default function CardInfo({
  data,
  title,
  className,
  ...props
}: {
  data: any[];
  title: string;
} & CardProps) {
  const totalPlantValue = data.length;

  const activePlantValue = data.filter((plant: any) => plant?.isActive)?.length;
  const inactivePlantValue = data.filter(
    (plant: any) => !plant?.isActive
  )?.length;
  const faultPlantValue = 0;

  const activePlantPercent =
    (data.filter((plant: any) => plant?.isActive)?.length / totalPlantValue) *
      100 || "0";
  const inactivePlantPercent =
    (data.filter((plant: any) => !plant?.isActive)?.length / totalPlantValue) *
      100 || "0";

  return (
    <Card shadow="sm" className={cn("", className)} {...props}>
      <CardHeader>
        <div className="w-full flex">
          <span className="font-semibold">{title}</span>
        </div>
      </CardHeader>

      <CardBody>
        <div className="grid xl:grid-cols-2">
          <div className="h-64">
            <CardInfoChart
              activeValue={Number(activePlantValue)}
              faultValue={Number(faultPlantValue)}
              inactiveValue={Number(inactivePlantValue)}
            />
          </div>

          <div className="space-y-2">
            <CardInfoLegend
              title="Active"
              value={Number(activePlantPercent)}
              color="success"
              logo={<CheckCircle2 className="text-success-500" />}
            />
            <CardInfoLegend
              title="Fault"
              value={Number(faultPlantValue)}
              color="danger"
              logo={<XCircle className="text-danger-500" />}
            />
            <CardInfoLegend
              title="Inactive"
              value={Number(inactivePlantPercent)}
              color="default"
              logo={<MinusCircle className="text-default-500" />}
            />
          </div>
        </div>
      </CardBody>

      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}
