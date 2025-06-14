import { Response } from "express";
import expressAsyncHandler from "express-async-handler";

import { CustomRequest } from "../types/CustomRequest";
import ProjectModel from "../models/Project.model";
import { logInfo } from "../utils/logger";

const getProjects = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
        try {
            const projects = await ProjectModel.find({});

            if (!projects) {
                res.status(400).json({ message: "No projects found" });
                return;
            }

            logInfo(`Projects: ${projects}`);

            res.status(201).json(projects);
        } catch (error: unknown) {
            res.status(500).json({
                message: "An error occured",
                error: `${error}`,
            });
        }
    }
);

const createProject = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
        try {
            const { title } = req.body;

            if (!title) {
                res.status(400).json({ message: "All fields are required" });
                return;
            }

            const project = await ProjectModel.create({
                title,
            });

            if (!project) {
                res.status(400).json({ message: "Project not created" });
                return;
            }

            logInfo(`Project created ${project}`);

            res.status(201).json({
                message: `Project created successfully`,
                project,
            });
        } catch (error: unknown) {
            res.status(500).json({
                message: "An error occured",
                error: `${error}`,
            });
        }
    }
);

const updateProject = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
        try {
            const { id } = req.params;
            const { title } = req.body;

            if (!title) {
                res.status(400).json({ message: "Title is required" });
                return;
            }

            const updatedProject = await ProjectModel.findByIdAndUpdate(
                id,
                { title },
                { new: true }
            );

            if (!updatedProject) {
                res.status(404).json({ message: "Project not found" });
                return;
            }

            logInfo(`Project updated: ${updatedProject._id}`);

            res.status(200).json({
                message: `Project updated successfully`,
                project: updatedProject,
            });
        } catch (error) {
            res.status(500).json({
                message: "An error occurred",
                error: `${error}`,
            });
        }
    }
);

const deleteProject = expressAsyncHandler(
    async (req: CustomRequest, res: Response) => {
        try {
            const { id } = req.params;

            const deletedProject = await ProjectModel.findByIdAndDelete(id);

            if (!deletedProject) {
                res.status(404).json({ message: "Project not found" });
                return;
            }

            logInfo(`Project delete: ${deletedProject._id}`);

            res.status(200).json({
                message: `Project deleted successfully`,
            });
        } catch (error) {
            res.status(500).json({
                message: "An error occurred",
                error: `${error}`,
            });
        }
    }
);

export default {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};
