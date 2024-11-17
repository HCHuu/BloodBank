import axios from "axios";
import { BASE_URL } from "../utils/constant";

function config() {
  const config = {
    headers: {
      Authorization: `Bearer ${document.cookie.replace("user=", "")}`,
    },
  };
  return config;
}

export async function getHospitalInfoById(id) {
  const data = await axios.get(`${BASE_URL}/api/hospitals/${id}`, config());

  return data?.data.data;
}

export async function sendBloodToHospital({ requestId, hospitalId, bloodType, bloods }) {
  console.log({ hospitalId, bloodType, bloods });
  await axios.put(
    `${BASE_URL}/api/bloods/export/${requestId}/${hospitalId}`,
    bloods,
    config()
  );
}
