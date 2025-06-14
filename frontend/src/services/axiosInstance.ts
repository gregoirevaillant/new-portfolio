import axios from "axios";

import refreshToken from "./auth/refreshToken";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACK_END_URL,
	withCredentials: true,
	timeout: 3000
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

axiosInstance.interceptors.response.use(
	(response) => {
		console.log("Response", response);
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		console.log('outside', error.config)
		if (error.response?.status === 403 && !originalRequest._retry) {
			console.log('originalRequest', originalRequest)
			console.log('error', error)
			originalRequest._retry = true;

			const newToken = await refreshToken();
			console.log('newToken', newToken)
			console.log('local', localStorage.getItem("token"))
			if (newToken) {
				console.log('inside new token')
				originalRequest.headers.Authorization = `Bearer ${newToken}`;
				return axiosInstance(originalRequest);
			} else {
				console.log('token else')
				localStorage.removeItem("token");
				window.location.href = "/login";
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
