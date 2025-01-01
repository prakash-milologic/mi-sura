"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function updateWorkOrder(id: string, body: any) {
  return axios.put(`/api/work_orders/${id}`, body);
}

export default function CloseWorkOrder({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) {
  const { mutate } = useMutation({
    mutationFn: () =>
      updateWorkOrder(id, { closedAt: new Date().toISOString() }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["work_orders_trigger"],
      });
    },
  });
  const queryClient = useQueryClient();

  const handleClose = () => {
    mutate();
  };

  return (
    <Button variant="outline" disabled={disabled} onClick={handleClose}>
      Close
    </Button>
  );
}
