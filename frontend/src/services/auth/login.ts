import axiosInstance from "../axiosInstance.ts";

const login = async (data: { email: string; password: string }) => {
    const response = await axiosInstance.post("/auth/login", data);

    if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
    }

    return response.data;
};

export default login;
