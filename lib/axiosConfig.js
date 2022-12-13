import axios from "axios";

const getRefreshToken = async () => {
  try {
    await axios.get("http://localhost:3000/api/auth/refresh/", {
      withCredentials: true,
    });
  } catch (error) {
    // handleError(error.response?.data?.msg);
    console.log(error.response?.data?.msg);
  }
};

const axiosConfig = (session) => {
  const authFetch = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/api/",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      const err = error.response;
      const originalReq = error.config;

      if (err) {
        if (err.status === 401 && !originalReq._retry) {
          originalReq._retry = true;

          if (session) {
            try {
              await getRefreshToken();
              return await authFetch(originalReq);
            } catch (error) {
              if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
              }

              return Promise.reject(error);
            }
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return authFetch;
};

export default axiosConfig;
