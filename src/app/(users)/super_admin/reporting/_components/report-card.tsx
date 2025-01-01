"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

type ReportCard = {
  title: string;
  description: string;
  navigateTo: string;
};

export default function ReportCard({
  title,
  description,
  navigateTo,
}: ReportCard) {
  const router = useRouter();

  return (
    <Card
      shadow="sm"
      className="max-w-[400px]"
      isPressable
      onPress={() => router.push(navigateTo)}
    >
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
