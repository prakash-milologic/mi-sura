import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function InverterRankingsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Inverter Name</TableHead>
          <TableHead>Peak Hours Today(h)</TableHead>
          <TableHead>Power Normalized</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Inverter</TableCell>
          <TableCell>--</TableCell>
          <TableCell>--</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Inverter</TableCell>
          <TableCell>--</TableCell>
          <TableCell>--</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
