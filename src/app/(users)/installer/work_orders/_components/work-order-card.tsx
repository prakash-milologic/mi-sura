import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import CurrentWOChart from "./current-wo-chart";

export default function WorkOrderCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <Card shadow="sm" className="h-full w-full">
      <CardHeader>
        <div className="w-full">
          <p className="font-semibold">{title}</p>
          <p className="text-sm font-medium text-foreground-400">{subtitle}</p>
        </div>
      </CardHeader>

      <CardBody>
        <div className="h-52 w-full">{children}</div>
      </CardBody>

      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}
