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

export default function IconWithText({
  key,
  title,
  value,
  unitValue,
  icon = "",
  className,
  headerText,
  ...props
}: {
  key: number;
  title?: string;
  value: number;
  unitValue?: string;
  icon?: React.ReactNode;
  className?: string;
  headerText?: string;
} & CardProps) {

  return (
    <Card shadow="none" className={cn("items-center justify-center", className)} {...props} key={key}>
      {headerText && <p className="text-xs text-center text-[#686868]dark:text-[#FFFFFFCC] font-normal pb-3 ">{headerText}</p>}
      <div className="icon">
        {icon}
      </div>
      <CardHeader className="justify-center pb-1 pt-4">
        <p className={`text-center font-semibold ${headerText ? "text-xl" : "text-4xl"} `}>{value} {unitValue}</p>
      </CardHeader>
      {title &&
        <CardBody className="p-0">
          <p className="text-sm text=[#686868] font-medium text-center">{title}</p>
        </CardBody>
      }
    </Card>
  );
}
