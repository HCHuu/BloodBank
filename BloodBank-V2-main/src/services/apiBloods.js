import axios from "axios";
import { BASE_URL } from "../utils/constant";

function config() {
  console.log(document.cookie.replace("user=", ""));
  const config = {
    headers: {
      Authorization: `Bearer ${document.cookie.replace("user=", "")}`,
    },
  };
  return config;
}
export async function getBloodsByHospitalId({ id }) {
  await new Promise((res) => setTimeout(res, 2000));
  const { data } = await axios.get(
    `${BASE_URL}/api/bloods/hospitals/${id}`,
    config()
  );
  return data?.data;
}
