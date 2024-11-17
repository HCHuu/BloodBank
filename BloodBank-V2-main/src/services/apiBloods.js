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
export async function getBloodsByHospitalId({ id }) {
  const { data } = await axios.get(
    `${BASE_URL}/api/bloods/hospitals/${id}`,
    config()
  );
  return data?.data;
}

export async function getBloodsByBloodType({ hospitalId, bloodType }) {
  const fakeData = {
    data: [
      {
        hospitalId: "8537af77-ea2b-4233-b7c3-08dc817b5e3d",
        hospital: null,
        bloodType: "O-",
        quantity: 100,
        expiryDate: "2024-09-19T10:00:55.4588803",
        createdDate: "2024-08-15T03:00:55.5894518+00:00",
        modifiedDate: "2024-08-15T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "d332e9d7-0334-484f-488d-08dcbcd67b26",
      },
      {
        hospitalId: "1d4eaf77-ea2b-4233-b7c3-08dc817b5e3e",
        hospital: null,
        bloodType: "O-",
        quantity: 150,
        expiryDate: "2024-10-15T10:00:55.4588803",
        createdDate: "2024-09-01T03:00:55.5894518+00:00",
        modifiedDate: "2024-09-01T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "e562c9d7-0334-484f-488d-08dcbcd67b27",
      },
      {
        hospitalId: "2f5eaf77-ea2b-4233-b7c3-08dc817b5e3f",
        hospital: null,
        bloodType: "O-",
        quantity: 200,
        expiryDate: "2024-11-20T10:00:55.4588803",
        createdDate: "2024-09-05T03:00:55.5894518+00:00",
        modifiedDate: "2024-09-05T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "f672d9d7-0334-484f-488d-08dcbcd67b28",
      },
      {
        hospitalId: "3g6eaf77-ea2b-4233-b7c3-08dc817b5e3g",
        hospital: null,
        bloodType: "O-",
        quantity: 250,
        expiryDate: "2024-12-01T10:00:55.4588803",
        createdDate: "2024-09-10T03:00:55.5894518+00:00",
        modifiedDate: "2024-09-10T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "g782e9d7-0334-484f-488d-08dcbcd67b29",
      },
      {
        hospitalId: "4h7eaf77-ea2b-4233-b7c3-08dc817b5e3h",
        hospital: null,
        bloodType: "O-",
        quantity: 300,
        expiryDate: "2025-01-10T10:00:55.4588803",
        createdDate: "2024-09-15T03:00:55.5894518+00:00",
        modifiedDate: "2024-09-15T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "h892e9d7-0334-484f-488d-08dcbcd67b30",
      },
      {
        hospitalId: "5i8eaf77-ea2b-4233-b7c3-08dc817b5e3i",
        hospital: null,
        bloodType: "O-",
        quantity: 350,
        expiryDate: "2025-02-20T10:00:55.4588803",
        createdDate: "2024-09-20T03:00:55.5894518+00:00",
        modifiedDate: "2024-09-20T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "j903e9d7-0334-484f-488d-08dcbcd67b31",
      },
      {
        hospitalId: "6j9eaf77-ea2b-4233-b7c3-08dc817b5e3j",
        hospital: null,
        bloodType: "O-",
        quantity: 400,
        expiryDate: "2025-03-30T10:00:55.4588803",
        createdDate: "2024-09-25T03:00:55.5894518+00:00",
        modifiedDate: "2024-09-25T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "k104e9d7-0334-484f-488d-08dcbcd67b32",
      },
      {
        hospitalId: "7k8eaf77-ea2b-4233-b7c3-08dc817b5e3k",
        hospital: null,
        bloodType: "O-",
        quantity: 450,
        expiryDate: "2025-04-15T10:00:55.4588803",
        createdDate: "2024-09-30T03:00:55.5894518+00:00",
        modifiedDate: "2024-09-30T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "l205e9d7-0334-484f-488d-08dcbcd67b33",
      },
      {
        hospitalId: "8l7eaf77-ea2b-4233-b7c3-08dc817b5e3l",
        hospital: null,
        bloodType: "O-",
        quantity: 500,
        expiryDate: "2025-05-20T10:00:55.4588803",
        createdDate: "2024-10-05T03:00:55.5894518+00:00",
        modifiedDate: "2024-10-05T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "m306e9d7-0334-484f-488d-08dcbcd67b34",
      },
      {
        hospitalId: "9m6eaf77-ea2b-4233-b7c3-08dc817b5e3m",
        hospital: null,
        bloodType: "O-",
        quantity: 550,
        expiryDate: "2025-06-15T10:00:55.4588803",
        createdDate: "2024-10-10T03:00:55.5894518+00:00",
        modifiedDate: "2024-10-10T03:00:55.5894529+00:00",
        isDelete: false,
        deleteDate: "0001-01-01T00:00:00+00:00",
        id: "n407e9d7-0334-484f-488d-08dcbcd67b35",
      },
    ],
    isSuccess: true,
    message: "Get successful",
  };

  const { data } = await axios.get(
    `${BASE_URL}/api/bloods/hospitals/${hospitalId}?bloodType=${encodeURIComponent(bloodType)}`,
    config()
  );

  return data?.data;
}
