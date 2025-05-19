import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

const API_BASE_URL = process.env.REACT_APP_BASE_URL || "https://khadv28.io.vn";

const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJleGFtMUBtYWlsaW5hdG9yLmNvbSIsImp0aSI6IjgxZTFlMzE0LTY3MmQtNDEwMi05MjBjLTJiMTM3OTNmOGJkOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImV4YW0xQG1haWxpbmF0b3IuY29tIiwiZXhwIjoxNzQzOTI1MjQ0LCJpc3MiOiJiYXNlV2ViQXBpSXNzZXIiLCJhdWQiOiJiYXNlV2ViQXBpSXNzZXIifQ.hws2H08KGoaXCA-emr64q0M5IwPQ0JgLDc8TnCvU3NU",
        "Content-Type": "application/json",
    },
});
apiInstance.interceptors.request.use(
    (config) => {
        const token = getCookie("AccessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



apiInstance.interceptors.response.use(
    (response) => {
        if (response.data.Status === 1 && response.data.Message === "Bạn không có quyền truy cập!") {
            alert("Bạn không có quyền truy cập!");
            return Promise.reject("Không có quyền truy cập");
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = getCookie("RefreshToken");
                const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
                if (data.status === 0 && data.data) {
                    const newAccessToken = data.data;
                    setCookie("AccessToken", newAccessToken);
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    // console.log('refresh token thành công');
                    return axios(originalRequest);
                } else {
                    alert("Không thể làm mới token, vui lòng đăng nhập lại.");
                }
            } catch (refreshError) {
                console.error("Lỗi refresh token:", refreshError);
            }
        }
        if (error.response?.data?.Status === 1 && error.response?.data?.Message === "Bạn không có quyền truy cập!") {
            alert("Bạn không có quyền truy cập!");
        }

        return Promise.reject(error);
    }
);


export default apiInstance;