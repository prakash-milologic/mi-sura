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

export default function ProductionCard({
  key,
  title,
  content,
  descContent,
  descTitle,
  className,
  chipColor ="",
  icon = "",
  imageSrc,
  itemStatus,
  isLLC,
  titleStyle = "",
  contentStyle = "",
  hideFooter = false,
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
  isLLC?: boolean;
  titleStyle?: string;
  contentStyle?: string;
  hideFooter?: boolean;
} & CardProps) {

  return (
    <Card shadow="none" className={cn("", className)} {...props} key={key}>
      {
        imageSrc ? (
          <Image
            src={imageSrc}
            alt="Card background"
            className="object-cover"
            width={259}
            height={158}
          />
        ) : null
      }
      <CardHeader className="p-0 flex justify-between">
        <p className={cn("text-sm sm:text-base text=[#171717CC] font-medium ", titleStyle)}>{title}</p>
        {icon && <div className="flex justify-center">{icon}</div>}
      </CardHeader>
      <CardBody className={`pt-2  px-0 ${!hideFooter && "border-b dark:border-b-[#FFFFFF26] pb-4"}`}>
        <p className={cn("text-2xl md:text-4xl font-semibold ", contentStyle)}>{content}</p>
      </CardBody>
      {!hideFooter && <CardFooter className="px-0 flex justify-between gap-1.5">
        {descTitle && <p className="text-xs font-medium text-foreground-400 dark:text-[#FFFFFFBF]">
          {descTitle}:
        </p>}
        {!descTitle && !descContent ? null : (
          <div className="flex space-x-2 items-center ">
            {/* <Chip size="sm"  className={`h-5 bg-[${chipColor}]`} radius="sm"> */}
            <Chip size="sm" className={cn('h-5', chipColor)} radius="sm">
              <p className="font-medium text-white"> {descContent}</p>
            </Chip>
          </div>
        )}
        {itemStatus ? (
          <div className="flex space-x-2 items-center ">
            {!isLLC && <p className={`text-xs font-medium dark:text-[#FFFFFFBF]`}>
              Status:
            </p>}
            {/* <Chip size="sm"  className={`h-5 bg-[${chipColor}]`} radius="sm"> */}
            <Chip size="sm" className={cn('h-5', chipColor)} radius="sm">
              <p className="font-medium "> {itemStatus}</p>
            </Chip>
          </div>
        ) : null}
      </CardFooter>
      }
    </Card>
  );
}
