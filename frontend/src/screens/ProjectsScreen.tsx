import { useEffect, useState } from 'react'
import getProjects from '../services/project/getProjects'
import type { IProject } from '../Interfaces/IProject'

const ProjectsScreen = () => {

    const [projects, setProjects] = useState<IProject[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            await getProjects()
                .then((response) => {
                    setProjects(response)
                }).catch((error) => {
                    console.log('error', error)
                }).finally(() => {
                    console.log('finally')
                })
        }

        fetchProjects()
    }, [])

    console.log('projects', projects)

    return (
        <div>
            <h1>projects</h1>

            {projects.map((project) => {
                return (
                    <h2>{project.title}</h2>
                )
            })}
        </div>
    )
}

export default ProjectsScreen