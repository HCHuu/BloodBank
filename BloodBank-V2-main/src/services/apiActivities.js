import axios from "axios";
import { BASE_URL, PAGE_SIZE } from "../utils/constant";

function config() {
  const config = {
    headers: {
      Authorization: `Bearer ${document.cookie.replace("user=", "")}`,
    },
  };
  return config;
}

export async function getAllActivities({ startDay, endDay }) {
  const data = await axios.get(
    `${BASE_URL}/api/activities?from=${startDay}&to=${endDay}&pageSize=${PAGE_SIZE}&status=${0}`
  );

  return data?.data?.data;
}

export async function getAcitivitiesByHospitalId(id, status) {
  const data = await axios.get(
    `${BASE_URL}/api/activities/hospitals/${id}?status=${status}`,
    config()
  );
  return data?.data?.data;
}

export async function getActivityById({ id, status }) {
  const data = await axios.get(
    `${BASE_URL}/api/activities/${id}?status=${status}`,
    config()
  );
  const hospitalId = data?.data?.data?.hospitalId;

  const hospitalData = await axios.get(
    `${BASE_URL}/api/hospitals/${hospitalId}`
  );

  return { ...data?.data?.data, ...hospitalData.data };
}

export async function createActivity(data) {
  await axios.post(`${BASE_URL}/api/activities`, data, config());
}

export async function updateActivity({ data, id }) {
  console.log(data);
  console.log(id);

  await axios.put(`${BASE_URL}/api/activities/${id}`, data, config());
}

export async function deleteActivity(id) {
  await axios.delete(`${BASE_URL}/api/activities/${id}`, config());
}
