import axios from "axios";
import config from "../config/config";

const getAllMenuItems = async (data) => {
  const response = await axios.get(`${config.baseApiUrl}/api/menu-items`, data);

  return response;
};

export { getAllMenuItems };
