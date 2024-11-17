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

export async function getBloodTransportAccept(hospitalId) {
  const { data } = await axios.get(
    `${BASE_URL}/api/requestBloods/hospitals/${hospitalId}/accept?page=1&pageSize=100`,
    config()
  );

  const fakeData = {
    data: [
      {
        hospitalId: "d4e41c7f-eedf-4f6b-21a8-08dc7efeb0ab",

        hospital: null,

        hospitalAccept: "8537af77-ea2b-4233-b7c3-08dc817b5e3d",

        bloodType: "O-",

        quantity: 100,

        status: 1,

        address: null,

        createdDate: "2024-09-13T16:10:47.2489652+00:00",

        modifiedDate: "2024-09-13T16:10:47.2489661+00:00",

        isDelete: false,

        deleteDate: "0001-01-01T00:00:00+00:00",

        id: "59d72f15-557c-42a5-5501-08dcd40e987b",
      },
    ],

    isSuccess: true,

    message: "Get successful",
  };

  return data?.data;
}
