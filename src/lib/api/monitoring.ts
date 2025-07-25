import { apiService } from "../axios";

export const GetMonitoringData = async (
  date: Date,
  mode: string,
  company: string
) => {
  try {
    const API_PATH = "api/Monitoring/GetMoniData";
    const res = await apiService.post(`${API_PATH}`, { date, mode, company });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const GetSupMonitoringData = async (
  date: Date,
  mode: string,
  company: string
) => {
  try {
    const API_PATH = "api/Monitoring/GetSupMoniData";
    const res = await apiService.post(`${API_PATH}`, {
      date,
      mode,
      company,
    });
    return res.data;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
