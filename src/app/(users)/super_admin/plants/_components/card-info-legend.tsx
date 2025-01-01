import { cn } from "@/lib/utils";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Progress,
} from "@nextui-org/react";
import { Zap } from "lucide-react";

export default function CardInfoLegend({
  title,
  value,
  color,
  logo,
  className,
  ...props
}: {
  title: string;
  value: number;
  logo: React.ReactNode;
  color: "success" | "danger" | "default";
} & CardProps) {
  return (
    <Card
      shadow="none"
      className={cn(
        "",
        {
          "bg-success-50": color === "success",
          "bg-danger-50": color === "danger",
          "bg-default-50": color === "default",
        },
        className
      )}
      {...props}
    >
      <CardBody>
        <div className="flex items-center space-x-2">
          <div className="flex-none">{logo}</div>

          <div className="grow">
            <span className="block">{title}</span>
            <Progress
              aria-label="Loading..."
              label={` `}
              color={color}
              showValueLabel
              value={value}
              classNames={{
                //   label: "font-semibold text-sm",
                value: "font-semibold text-sm text-foreground-400",
              }}
              className="max-w-full"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
