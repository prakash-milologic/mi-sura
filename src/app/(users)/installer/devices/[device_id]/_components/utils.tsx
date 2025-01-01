import axios from "axios";

export function fetchDeviceData({ deviceId }: { deviceId: string }) {
  return axios.get(`/api/tsdb/device_data/${deviceId}?check_plant=false`);
}
