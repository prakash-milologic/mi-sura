"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useDevices } from "@/hooks/useDevices";

export default function WorkOrdersPage() {
  return (
    <div className="space-y-5">
      <Link
        href={"/user/work_orders/create"}
        className={buttonVariants({ variant: "outline" })}
      >
        Create +
      </Link>
    </div>
  );
}
