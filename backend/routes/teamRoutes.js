import express from "express";

import protect from "../middleware/authMiddleware.js";

import {

addMember,

removeMember

}

from "../controllers/teamController.js";

const router=express.Router();

router.put(

"/:projectId/add",

protect,

addMember

);

router.put(

"/:projectId/remove/:userId",

protect,

removeMember

);

export default router;