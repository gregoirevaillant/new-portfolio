import type { IProject } from "../../Interfaces/IProject.ts";
import axiosInstance from "../axiosInstance.ts";

const postProject = async (project: IProject) => {
	const response = await axiosInstance.post("/projects", project);

	return response.data;
};

export default postProject;
