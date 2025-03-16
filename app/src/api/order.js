import api from "./api";

async function checkoutOrder(id, data) {
  const response = await api.put(`/api/orders/${id}/checkout`, data);

  return response.data;
}

async function confirmOrder(id, status, transactionId) {
  const response = await api.put(
    `/api/orders/${id}/confirm?status=${status}&transactionId=${transactionId}`
  );

  return response.data;
}

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

export { checkoutOrder, createOrder, getOrdersByUser, confirmOrder };
