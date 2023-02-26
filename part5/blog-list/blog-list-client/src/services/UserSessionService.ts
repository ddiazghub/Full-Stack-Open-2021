import axios from "axios";
import ICredentials from "../utils/interfaces/ICredentials";
import IUserSessionData from "../utils/interfaces/IUserSessionData";

let user: IUserSessionData | null = null;

const login = async (credentials: ICredentials) => {
  const response = await axios.post<IUserSessionData>("/api/login", credentials);
  user = response.data;

  return user;
};

const getToken = (): string | null => user ? user.token : null;
const setUser = (newUser: IUserSessionData | null) => user = newUser;

export default {
  login,
  getToken,
  setUser
};