import axios from "axios";

const baseUrl: string | undefined = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);
const get = (url: string) => {
  return axios.get(baseUrl + `${url}`, {});
};
const deleteData = (url: string) => {
  return axios.delete(baseUrl + `${url}`, {});
};

const post = (url: string, data: any) => {
  return axios.post(baseUrl + url, data);
};

const patch = (url: string, data: any) => {
  return axios.patch(baseUrl + url, data);
};

const HttpService = {
  get,
  deleteData,
  patch,
  post,
};

export default HttpService;
