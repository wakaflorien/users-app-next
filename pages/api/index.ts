import { notification } from "antd";
import axios from "axios";
import API from "./api";
export const getAllUsers = async () => {
  try {
    const response = await API.get(`/api/v1/users`);
    if (response.data.data) {
      return response.data.data;
    }
  } catch (error: any) {
    notification.error({
      message: "Failed",
      description: `${error.response.data.error}`,
    });
  }
};
export const createUser = async (payload: any) => {
  try {
    const response = await API.post(`/api/v1/auth/register`, payload);
    if (response.data.data) {
      return response.data.data;
    }
  } catch (error: any) {
    notification.error({
      message: "Failed",
      description: `${error.response.data.error}`,
    });
  }
};
export const UpdateUser = async (id: string, payload: any) => {
  try {
    const response = await API.put(`/api/v1/update/${id}`, payload);
    if (response.data.data) {
      return response.data.data;
    }
  } catch (error: any) {
    notification.error({
      message: "Failed",
      description: `${error.response.data.error}`,
    });
  }
};
export const singleUser = async (id: string) => {
  try {
    const response = await API.put(`/api/v1/update/${id}`);
    if (response.data.data) {
      return response.data.data;
    }
  } catch (error: any) {
    notification.error({
      message: "Failed",
      description: `${error.response.data.error}`,
    });
  }
};
