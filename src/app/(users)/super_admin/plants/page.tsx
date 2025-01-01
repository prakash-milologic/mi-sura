import React from "react";
import CardInfoContainer from "./_components/card-info-container";
import TableContainer from "./_components/table-container";
import Image from "next/image";


export default function AnalysisPage() {
  return (
    <div className="px-6 space-y-5">
      <CardInfoContainer />
      <TableContainer />
    </div>
  );
}
