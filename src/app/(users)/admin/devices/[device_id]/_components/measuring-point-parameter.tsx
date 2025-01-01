import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import MPPOverview from "./mpp-overview";
import MPPTInformation from "./mppt-information";

export default function MeasuringPointParameter() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="text-lg font-semibold">Measuring Point Parameter</div>
      </CardHeader>
      <CardBody>
        <div>
          <MPPOverview />
          <MPPTInformation />
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}
