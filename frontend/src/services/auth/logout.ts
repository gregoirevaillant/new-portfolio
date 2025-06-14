import axiosInstance from "../axiosInstance.ts";

const logout = async () => {
	const response = await axiosInstance.post("/auth/logout");

	return response.data;
};

export default logout;
