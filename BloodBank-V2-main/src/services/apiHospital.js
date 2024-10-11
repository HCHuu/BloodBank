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

export async function sendBloodToHospital({ hospitalId, bloodType, bloods }) {
  console.log({ hospitalId, bloodType, bloods });
  await axios.post(
    `${BASE_URL}/api/hospitals/${hospitalId}?bloodType=${bloodType}`,
    bloods,
    config()
  );
}
