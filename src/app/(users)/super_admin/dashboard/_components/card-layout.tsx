import { cn } from "@/lib/utils";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardProps,
    Chip
} from "@nextui-org/react";

export default function CardLayout({
  title,
  content,
  className,
  children,
}: {
  title: string;
  content?: string;
  children: React.ReactNode;
  className?: string;

} & CardProps) {
  return (
    <Card shadow="sm" className={cn("", className)}>
      <CardHeader className="border-b-1 dark:border-b-[#FFFFFF26] flex justify-between p-6 ">
        <p className=" lg:text-xl text-lg  font-semibold text-black rounded-2xl dark:text-white">{title}</p>
        <p className="text-xs font-normal text-[#171717BF] rounded-2xl dark:text-[#FFFFFFBF] ">{content??""}</p>
      </CardHeader>
      <CardBody className="p-6">
            {children}
      </CardBody>
    </Card>
  );
}
