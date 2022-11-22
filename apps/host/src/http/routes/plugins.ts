import * as plugins from "../controllers/plugins";
import express from "express";

const router = express.Router();

//  Serve plugins icons
router.get("/:pluginScope/:pluginName/logo", plugins.getLogo);

export default router;
