import api from "./api";

const addMenuItem = async (data) => {
  const response = await api.post(`/api/menu-items`, data);

  return response;
};

const editMenuItem = async (id, data) => {
  const response = await api.put(`/api/menu-items/${id}`, data);

  return response;
};

const getAllMenuItems = async () => {
  const response = await api.get(`/api/menu-items`);

  return response;
};

const getMenuItemById = async (id) => {
  const response = await api.get(`/api/menu-items/${id}`);

  return response;
};

export { getAllMenuItems, addMenuItem, editMenuItem, getMenuItemById };
