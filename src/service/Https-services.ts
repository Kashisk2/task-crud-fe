import axios from "axios";

// Get the base URL from the environment variable REACT_APP_API_URL
const baseUrl: string | undefined = process.env.REACT_APP_API_URL;

// Function to perform a GET request
const get = (url: string) => {
  return axios.get(baseUrl + `${url}`, {});
};

// Function to perform a DELETE request
const deleteData = (url: string) => {
  return axios.delete(baseUrl + `${url}`, {});
};

// Function to perform a POST request
const post = (url: string, data: any) => {
  return axios.post(baseUrl + url, data);
};

// Function to perform a PATCH request
const patch = (url: string, data: any) => {
  return axios.patch(baseUrl + url, data);
};

// HTTP service object containing methods for various HTTP requests
const HttpService = {
  get,
  deleteData,
  patch,
  post,
};

// Export the HTTP service object
export default HttpService;
