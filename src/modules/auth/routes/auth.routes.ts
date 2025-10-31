import express from "express";
import authLoginRouter from "./auth.login.routes";
import authLogoutRouter from "./auth.logout.routes";
import authRefreshTokenRouter from "./auth.refreshToken.routes";

const routerAuth = express.Router();

routerAuth.use("/", authLoginRouter);

routerAuth.use("/", authLogoutRouter);

routerAuth.use("/", authRefreshTokenRouter);

export default routerAuth;
