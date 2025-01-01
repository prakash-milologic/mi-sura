export type IRole = "super-admin" | "admin" | "installer" | "user";

export type IPermission = {
  id: string;
  created_at: string;
  role: "super-admin" | "admin" | "installer" | "user";
  status: "active" | "inactive";
  user_id: string;
  created_by: string;
  user: {
    id: string;
    created_at: string;
    name: string;
    email: string;
  };
};

export type IPlant = {
  id: string;
  name: string;
  isAlert: boolean;
  capacity: number;
  production: number;
  power: number;
  trend: any[] | null;
  dailyProduction: number;
  peakHoursToday: number;
};

export type IDevice = {
  id: string;
  name: string;
  status: "active" | "inactive";
  connectedPlant: string;
  dcDiscrete: number;
  production: number;
  dailyProduction: number;
  peakHoursToday: number;
  installer: string;
};

export type IAlert = {
  id: string;
  status: string;
  plant: string;
  device: string;
  openedTime: string;
};

export type IWorkOrders = {
  id: string;
  device: string;
  plant: string;
  alarm: string;
  opened: {
    on: string;
    by: string;
  };
  assigned: {
    on: string;
    to: string;
  };
  closed: {
    on: string;
  };
};
