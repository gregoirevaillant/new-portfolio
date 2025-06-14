import axiosInstance from '../axiosInstance'

const deleteProject = async (id: string) => {
  const response = await axiosInstance.delete(`/projects/${id}`)

  return response.data
}

export default deleteProject
