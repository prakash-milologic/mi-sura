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

const plants = [
  {
    name: "Plant A",
    location: "Kajang, Selangor",
    status: "success",
    value: 8,
    max: 10,
  },
  {
    name: "Plant B",
    location: "Tanjung Malim, Perak",
    status: "danger",
    value: 3,
    max: 10,
  },
  {
    name: "Plant C",
    location: "Kuala Siput, Johor",
    status: "warning",
    value: 5,
    max: 10,
  },
];

const CardItem = ({ data }: { data: any }) => {
  const percentage = (data.value / data.max) * 100;

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

export default function PlantListCard() {
  return (
    <Card shadow="none" className="h-[550px] p-5">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-semibold">Plant List</p>
            <p className="text-sm font-medium text-foreground-400">
              List of the plants
            </p>
          </div>
          <Link size="sm" href="#">
            All List
          </Link>
        </div>
      </CardHeader>

      <CardBody>
        <div className="space-y-5">
          {plants.map((plant, index) => (
            <CardItem key={index} data={plant} />
          ))}
        </div>
      </CardBody>

      <CardFooter></CardFooter>
    </Card>
  );
}
