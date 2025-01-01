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

export default function CardInfo({
  title,
  content,
  descContent,
  descTitle,
  className,
  ...props
}: {
  title: string;
  content: string;
  descTitle?: string;
  descContent?: string;
} & CardProps) {
  return (
    <Card shadow="sm" className={cn("p-2 ", className)} {...props}>
      <CardHeader>
        <p className="text-sm font-medium text-foreground-400 text-white rounded-2xl px-4 py-2 bg-green-600">{title}</p>
      </CardHeader>

      <CardBody></CardBody>

      <CardFooter className="flex justify-end">
        <div >
          <p className="text-4xl font-bold ">{content}</p>

          {!descTitle && !descContent ? null : (
            <div className="flex space-x-2 items-center ">
              <p className="text-sm font-medium text-foreground-400">
                {descTitle}
              </p>
              <Chip size="sm" className="h-5 bg-primary" radius="sm">
                <p className="font-medium text-white"> {descContent}</p>
              </Chip>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
