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
  ChevronUp,
  DatabaseZap,
  LucideIcon,
} from "lucide-react";

export default function CardInfo({
  title,
  subtitle,
  value,
  unitValue,
  logo,
  className,
  ...props
}: {
  title: string;
  subtitle: string;
  value: string;
  unitValue: string;
  logo: React.ReactNode;
} & CardProps) {
  return (
    <Card shadow="sm" className={cn("space-y-5", className)} {...props}>
      <CardHeader></CardHeader>

      <CardBody>
        <div className="flex items-center justify-between px-5">
          <div>{logo}</div>
          <div className="flex items-center space-x-2">
            <span className="text-6xl font-semibold">{value}</span>
            <span className="text-sm font-semibold">{unitValue}</span>
          </div>
        </div>
      </CardBody>

      <CardFooter className="bg-black bg-opacity-10">
        <div className="flex flex-col px-5 ">
          <span className="text-2xl font-semibold">{title}</span>
          <span className="text-sm font-semibold opacity-60">{subtitle}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
