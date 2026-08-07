import express from "express";
import { TeamController } from "./team.controller.js";
import { asyncHandler } from "../../../shared/error/asyncHandler.js";

const router =  express.Router();
const teamController = new TeamController();

router.get("/", asyncHandler(teamController.getTeams.bind(teamController)));
router.get("/:id", asyncHandler(teamController.getTeamById.bind(teamController)));

export default router;