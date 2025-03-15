import api from "./api";

async function createOrder(data) {
  const response = await api.post(`/api/orders`, data);

  return response.data;
}

export { createOrder };
