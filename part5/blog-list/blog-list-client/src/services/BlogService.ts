import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import IBlog from "../utils/interfaces/IBlog";
import session from "./UserSessionService";

const getAll = async (): Promise<IBlog[]> => {
  const response = await axios.get<IBlog[]>("/api/blogs");
  return response.data;
};

const create = async (newBlog: IBlog): Promise<IBlog> => {
  const token = session.getToken();

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post<IBlog>("/api/blogs", newBlog, config);
  return response.data;
};

export default {
  getAll,
  create
};