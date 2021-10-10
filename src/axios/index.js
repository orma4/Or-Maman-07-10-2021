import axios from "axios";
/* Keys collection */
//export const API_KEY = "KGG4MsGrLX31oCFZpEeCrsjeJp0ZUVpt";
//export const API_KEY = "UHwmJ0wrj6TgDtbj4DrKcfY88MWnGhp8";
//export const API_KEY = "eB23GARxmmVMANbRzvJaDA4t2TanwbtJ";
export const API_KEY = "Wg05xu9wQCVjOdmCWyCWfXuQoQAFsHSE";
const instanceConfig = {
  // baseURL: "http://localhost:3000/", //For development

  baseURL: "https://dataservice.accuweather.com/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
};

const http = axios.create(instanceConfig);

export default http;
