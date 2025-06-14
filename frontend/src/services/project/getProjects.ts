import axiosInstance from "../axiosInstance";

const getProjects = async () => {
    const response = await axiosInstance.get("/projects");

    return response.data;
};

export default getProjects;
