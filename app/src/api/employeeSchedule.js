import api from "./api";

async function getSchedules() {
  const response = await api.get(`/api/schedules`);

  return response;
}

async function createSchedule(data) {
  const response = await api.post(`/api/schedules`, data);

  return response;
}

export { getSchedules, createSchedule };
