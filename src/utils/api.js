import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL
    ? process.env.API_URL
    : "http://192.168.33.10/api",
});
instance.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => {
    console.log(err);
    /*if (err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/#/logout";
    }*/
    return Promise.reject();
  }
);
instance.interceptors.request.use(
  (config) => {
    const tokenInStorage = localStorage.getItem("token");
    const isTokenStored =
      tokenInStorage !== null &&
      tokenInStorage !== undefined &&
      tokenInStorage !== "";
    if (isTokenStored) {
      return {
        ...config,
        headers: {
          ...config.headers,
          common: {
            ...config.headers.common,
            Authorization: `Bearer ${tokenInStorage}`,
          },
        },
      };
    }
    return config;
  },
  (err) => Promise.error(err)
);

export default instance;
