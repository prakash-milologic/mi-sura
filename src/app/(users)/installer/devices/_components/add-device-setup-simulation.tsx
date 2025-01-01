import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import React from "react";

export default function AddDeviceSetupSimulation() {
  const addDeviceSetup = async () => {
    try {
      const res = await axios.post(`/api/test`);

      toast({
        title: "Success",
        variant: "default",
        description: JSON.stringify(res.data),
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    }
  };

  return (
    <Button variant={"outline"} onClick={addDeviceSetup}>
      Add Device Setup Simulation
    </Button>
  );
}
