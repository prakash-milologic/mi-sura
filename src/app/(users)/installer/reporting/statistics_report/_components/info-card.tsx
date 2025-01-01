import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

type InfoCard = {
  title: string;
  primaryBodyTitle: string;
  primaryBodyValue: string;
  secondaryBodyTitle: string;
  secondaryBodyValue: string;
};

export default function InfoCard({
  title,
  primaryBodyTitle,
  primaryBodyValue,
  secondaryBodyTitle,
  secondaryBodyValue,
}: InfoCard) {
  return (
    <Card
      shadow="none"
      className="border"
      classNames={{
        base: "bg-neutral-50 dark:bg-neutral-800",
      }}
    >
      <CardHeader>
        <div className="font-bold">{title}</div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2">
          <div className="space-y-2">
            <div className="font-light text-sm">{primaryBodyTitle}</div>
            <div className="text-xl font-bold">{primaryBodyValue}</div>
          </div>

          <div className="space-y-2">
            <div className="font-light text-sm">{secondaryBodyTitle}</div>
            <div className="text-lg font-bold">{secondaryBodyValue}</div>
          </div>
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
