import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { EggFried, Grip, TreePine } from "lucide-react";

const CardItem = ({
  data,
  enableDivider = false,
}: {
  data: any;
  enableDivider?: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2 items-center w-full">
      <div className="sm:col-span-4 flex items-center space-x-4">
        {data.icon}
        <div>
          <p className="text-sm font-semibold">{data.title}</p>
          <p className="text-xs font-medium text-foreground-400">
            {data.description}
          </p>
        </div>
      </div>
      <div className="sm:col-span-1 flex justify-end">
        <p className="font-semibold">
          {data?.value == undefined ? "-" : Math.floor(data.value * 100) / 100}{" "}
          {data.unitValue}
        </p>

        {/* data.value */}
      </div>

      <div className="sm:col-span-5">{enableDivider ? <Divider /> : null}</div>
    </div>
  );
};

export default function CardEnvironmental({ impacts }: { impacts: any[] }) {
  return (
    <Card shadow="sm" className="p-5">
      <CardHeader className="absolute z-10 top-1">
        <div>
          <p className="font-semibold text-white">Environmental Impacts</p>
          {/* <p className="text-sm font-medium text-gray-300">
            Subtitle environmental
          </p> */}
        </div>
      </CardHeader>

      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-[350px] scale-125 object-cover"
        src="/sky.jpg"
      />

      {/* <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="/sky.jpg"
          height={300}
          width={270}
        />
      </CardBody> */}

      <CardFooter className="px-10 absolute bg-background shadow-[0_0px_50px_50px] shadow-background bottom-0 left-0 border-zinc-100/50 z-10 justify-between">
        <div className="w-full space-y-1">
          {impacts.map((impact, index) => (
            <CardItem
              key={index}
              data={impact}
              enableDivider={index + 1 === impacts.length ? false : true}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
