import { IAlert, IDevice, IPlant, IWorkOrders } from "../types";

export const plants: IPlant[] = [
  {
    id: "plant1",
    name: "Greenbase Solution (MIMOS)",
    isAlert: false,
    capacity: 20,
    production: 0.97,
    power: 4.89,
    trend: null,
    dailyProduction: 38.2,
    peakHoursToday: 1.91,
  },
];

export const devices: IDevice[] = [
  {
    id: "10123400591",
    name: "Sungrow",
    status: "active",
    connectedPlant: "Greenbase Solution (MIMOS)",
    dcDiscrete: 0,
    production: 0,
    dailyProduction: 0,
    peakHoursToday: 0,
    installer: "",
  },
  // {
  //   id: "10119883324",
  //   name: "Inverter",
  //   status: "inactive",
  //   connectedPlant: "MI-Energy",
  //   dcDiscrete: 0,
  //   production: 0,
  //   dailyProduction: 0,
  //   peakHoursToday: 0,
  // },
];

export const alerts: IAlert[] = [
  // {
  //   id: "alert1",
  //   name: "Inverter Soft Fail",
  //   status: "Closed",
  //   importance: "Warning",
  //   plant: "MI-Energy",
  //   device: "Inverter",
  //   openedTime: new Date().toLocaleTimeString(),
  //   closedTime: new Date().toLocaleTimeString(),
  // },
  // {
  //   id: "alert2",
  //   name: "OP DC Voltage Over",
  //   status: "Closed",
  //   importance: "Warning",
  //   plant: "MI-Energy",
  //   device: "Inverter",
  //   openedTime: new Date().toLocaleTimeString(),
  //   closedTime: new Date().toLocaleTimeString(),
  // },
];

export const workOrders: IWorkOrders[] = [
  // {
  //   id: "WO#1",
  //   plant: "Plant 1",
  //   alarm: "Excessively High Ambient Temperature",
  //   opened: {
  //     on: new Date().toLocaleString(),
  //     by: "John Doe",
  //   },
  //   assigned: {
  //     on: new Date().toLocaleString(),
  //     to: "Evan Smith",
  //   },
  //   closed: {
  //     on: new Date().toLocaleString(),
  //   },
  // },
  // {
  //   id: "WO#2",
  //   plant: "Plant 2",
  //   alarm: "PV Voltage High",
  //   opened: {
  //     on: new Date().toLocaleString(),
  //     by: "John Doe",
  //   },
  //   assigned: {
  //     on: new Date().toLocaleString(),
  //     to: "Evan Smith",
  //   },
  //   closed: {
  //     on: new Date().toLocaleString(),
  //   },
  // },
];
