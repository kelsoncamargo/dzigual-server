import express from "express";

import routerAuth from "./routes/auth.routes";

const authRouter = express.Router();

authRouter.use("/", routerAuth);

export default authRouter;
