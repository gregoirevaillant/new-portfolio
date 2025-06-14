import axiosInstance from "../axiosInstance";

const refreshToken = async () => {
	try {
		const response = await axiosInstance.get("/auth/refresh", {
			withCredentials: true
		});
		const { token } = response.data;

		localStorage.setItem("token", token);

		return token;
	} catch (error) {
		console.error("Failed to refresh token:", error);
		return null;
	}
};

export default refreshToken;
