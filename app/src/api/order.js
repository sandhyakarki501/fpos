import api from "./api";

async function createOrder(data) {
  const response = await api.post(`/api/orders`, data);

  return response.data;
}

async function getOrdersByUser(status, userId) {
  const response = await api.get(
    `/api/orders/users/${userId}?status=${status}`
  );

  return response.data;
}

export { createOrder, getOrdersByUser };
