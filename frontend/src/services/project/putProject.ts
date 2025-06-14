import type { IProject } from '../../Interfaces/IProject'
import axiosInstance from '../axiosInstance'

const putProject = async (id: string, data: IProject) => {
  const response = await axiosInstance.put(`/projects/${id}`, data)
  
  return response.data
}

export default putProject
