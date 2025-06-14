import express from "express";

import project from "../controllers/project.controller";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.route("/").get(project.getProjects)
router.route("/:id").put(project.updateProject).delete(project.deleteProject)

router.use(verifyJWT);

router.route("/").post(project.createProject)

export default router;
