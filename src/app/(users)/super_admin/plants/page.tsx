import React from "react";
import CardInfoContainer from "./_components/card-info-container";
import TableContainer from "./_components/table-container";
import Image from "next/image";


export default function AnalysisPage() {
  return (
    <div className="bg-[#EFF4F8] pt-2 md:pt-12 px-8 dark:bg-[#0B0A08] ">
      <CardInfoContainer />
      <TableContainer />
    </div>
  );
}
