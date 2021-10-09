import axios from "axios";

const instanceConfig = {
  // baseURL: "http://localhost:3000/",
  baseURL: "http://dataservice.accuweather.com/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
};

const http = axios.create(instanceConfig);

export default http;
