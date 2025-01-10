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

export default function StaticsCard({
 key,
  title,
  content,
  descContent,
  descTitle,
  className,
  chipColor,
  icon="",
  imageSrc,
  itemStatus,
  titleStyle="",
  contentStyle="",
  borderColor="",
  ...props
}: {
  key: number;
  title: string;
  content: string;
  descTitle?: string;
  descContent?: string;
  chipColor?: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  itemStatus?: string;
  titleStyle?: string;
  contentStyle?: string;
  borderColor?: string;
} & CardProps) {
 
  return (
    <Card shadow="none" className={cn("bg-[#F9FAFB] p-6  dark:bg-[#333338]", className)} {...props} key={key}>
      <CardHeader className="p-0 flex justify-between">
        <p className={cn("text-sm sm:text-base text-[#171717BF] dark:text-white/75 font-medium ",titleStyle)}>{title}</p>
      </CardHeader>
      <CardBody className={`pt-3 pb-4 px-0 border-b ${borderColor}`}>
          <p className={cn("text-2xl md:text-4xl font-semibold ",contentStyle)}>{content}</p>
      </CardBody>
      <CardFooter className="px-0 pt-4 flex justify-between gap-1.5">
            <div className="flex space-x-2 items-center ">
             <p className={`text-xs sm:text:sm font-medium text-[#171717A6] dark:text-[#FFFFFFBF]`}>
                {descTitle}
              </p>
              <Chip size="sm"  className={cn('h-5',chipColor)} radius="sm">
                <p className="font-medium "> {descContent}</p>
              </Chip>
            </div>
      </CardFooter>
    </Card>
  );
}
