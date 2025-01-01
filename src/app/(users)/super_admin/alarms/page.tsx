import React from "react";
import CardInfoContainer from "./_components/card-info-container";
import TableCard from "./_components/table-card";

export default function AlarmsPage() {
  return (
    <div className="px-6 space-y-5">
      <CardInfoContainer />

      <TableCard />
    </div>
  );
}
