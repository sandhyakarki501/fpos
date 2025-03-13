import axios from "axios";
import config from "../config/config";

const login = async (data) => {
  const response = await axios.post(
    `${config.baseApiUrl}/api/auth/login`,
    data
  );

  return response;
};

const register = async (data) => {
  const response = await axios.post(
    `${config.baseApiUrl}/api/auth/register`,
    data
  );

  return response;
};

export { login, register };
