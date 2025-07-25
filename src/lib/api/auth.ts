import axios from "axios";
import { apiService } from "../axios";
import type { LoginRequest } from "@/data/dto/request/auth";

export const login = async (data: LoginRequest) => {
  try {
    const res = await apiService.post("/api/Auth/login", data);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logout = async () => {
  try {
    const res = await apiService.post("/api/Auth/logout", {});
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const refresh = async () => {
  try {
    const res = await apiService.post("/api/Auth/refresh", {});
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const me = async () => {
  try {
    const res = await apiService.get("/api/Auth/me");
    console.log(res);
    return res;
  } catch (err: any) {
    if (err.status && err.status === 401) {
      return null;
    }
    return err; // Re-throw the error for further handling if needed
  }
};
