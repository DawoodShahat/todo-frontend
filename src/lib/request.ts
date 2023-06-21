// @ts-nocheck
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// types for when axios response is intercepted and changed to `response.data`
declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

const request = axios.create();

const requestHandler = (request: AxiosRequestConfig<any>) => {
  return Promise.resolve({
    ...request,
    headers: {
      ...request.headers,
    },
  });
};

const responseHandler = (response: AxiosResponse) => {
  console.debug("Request Successful!", response);

  if (Array.isArray(response.data)) {
    return { status: response.status, data: response.data };
  }

  return { status: response.status, ...response.data };
};

const errorHandler = (error: AxiosError) => {
  console.error("Request Failed:", error.config);
  if (error.response) {
    const { status, data, headers, config } = error.response;

    switch (status) {
      case 404:
        console.error(
          `Resource: On ${config.url} does not exist, status code 404`
        );
        return Promise.reject({
          status: error.response.status,
          data: error.response.data,
        });

      case 422:
        return Promise.reject({
          status: error.response.status,
          data: error.response.data,
        });
      default:
    }

    console.error("---------Unhandled Response---------");
    console.error("Status:", status);
    console.error("Data:", data);
    console.error("Headers:", headers);
    console.error("---------Unhandled Response End---------");
  } else {
    console.error("Error Message(NO RESPONSE):", error.message);
  }

  return Promise.reject(error.response || error.message);
};

request.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

request.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

request.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
request.defaults.withCredentials = false;

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // @ts-ignore
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => console.error(error)
);

export default request;
