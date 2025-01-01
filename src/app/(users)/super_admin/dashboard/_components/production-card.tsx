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
  chipColor,
  icon="",
  imageSrc,
  itemStatus,
  isLLC,
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
        <p className="text-base text=[#171717CC] font-medium ">{title}</p>
          {icon && <div className="flex justify-center">{icon}</div>}
      </CardHeader>
      <CardBody className="pt-2 pb-4 px-0 border-b dark:border-b-[#FFFFFF26]">
          <p className="text-4xl font-semibold ">{content}</p>
      </CardBody>
      <CardFooter className="px-0 flex justify-between gap-1.5">
   { descTitle &&  <p className="text-xs font-medium text-foreground-400 dark:text-[#FFFFFFBF]">
                {descTitle}:
              </p>}
          {!descTitle && !descContent ? null : (
            <div className="flex space-x-2 items-center ">
              {/* <Chip size="sm"  className={`h-5 bg-[${chipColor}]`} radius="sm"> */}
              <Chip size="sm"  className={cn('h-5',chipColor)} radius="sm">
                <p className="font-medium text-white"> {descContent}</p>
              </Chip>
            </div>
          )}
          {itemStatus ? (
            <div className="flex space-x-2 items-center ">
             { !isLLC && <p className={`text-xs font-medium dark:text-[#FFFFFFBF]`}>
                Status:
              </p>}
              {/* <Chip size="sm"  className={`h-5 bg-[${chipColor}]`} radius="sm"> */}
              <Chip size="sm"  className={cn('h-5',chipColor)} radius="sm">
                <p className="font-medium "> {itemStatus}</p>
              </Chip>
            </div>
          ) : null}
      </CardFooter>
    </Card>
  );
}
