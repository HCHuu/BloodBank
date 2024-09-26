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

export async function getDonorInfoById(id) {
  const { data } = await axios.get(`${BASE_URL}/api/donors/${id}`, config());
  return data?.data;
}
