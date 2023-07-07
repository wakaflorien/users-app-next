import { notification } from "antd";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/v1/users`);
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
    const response = await axios.post(
      `${baseURL}/api/v1/auth/register`,
      payload
    );
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
    const response = await axios.put(`${baseURL}/api/v1/update/${id}`, payload);
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
    const response = await axios.put(`${baseURL}/api/v1/user/${id}`);
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

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/api/v1/user/${id}`);
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
