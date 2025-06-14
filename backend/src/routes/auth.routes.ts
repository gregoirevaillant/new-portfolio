import express from "express";

import auth from "../controllers/auth.controller";
import loginLimiter from "../middleware/loginLimiter";

const router = express.Router();

router.route("/register").post(auth.register);
router.route("/login").post(loginLimiter, auth.login);
router.route("/refresh").get(auth.refresh);
router.route("/logout").post(auth.logout);

export default router;
