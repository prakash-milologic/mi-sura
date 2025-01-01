"use client";
import {
  Table,
  TableCaption,
  TableFooter,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchDeviceData } from "./utils";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
];

export default function MPPTInformation() {
  const { device_id: deviceId } = useParams<{ device_id: string }>();
  const {
    data: deviceData,
    isLoading: isLoadingDeviceData,
    error: errorDeviceData,
    refetch: refetchDeviceData,
  } = useQuery({
    queryKey: ["device_data", deviceId],
    queryFn: () => fetchDeviceData({ deviceId }),
    refetchInterval: 30000,
  });

  const getTableData = () => {
    let tableData: any[] = [];
    if (deviceData?.data?.manufacturer === "sungrow") {
      let mppt1 = {
        mppt: "MPPT1",
        voltage: deviceData?.data?.rtData?.[0]?.m1v,
        current: deviceData?.data?.rtData?.[0]?.m1c,
      };

      let mppt2 = {
        mppt: "MPPT2",
        voltage: deviceData?.data?.rtData?.[0]?.m2v,
        current: deviceData?.data?.rtData?.[0]?.m2c,
      };

      tableData = [mppt1, mppt2];
    }

    return tableData;
  };

  const tableData = getTableData();

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="font-semibold">MPPT Information</div>
      </CardHeader>
      <CardBody>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MPPT</TableHead>
                <TableHead>Voltage</TableHead>
                <TableHead>Current</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.length ? (
                tableData.map((data: any) => (
                  <TableRow key={data?.mppt}>
                    <TableCell className="font-medium">{data?.mppt}</TableCell>
                    <TableCell>{data?.voltage}</TableCell>
                    <TableCell>{data?.current}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
