import express from "express";
import { ScoreController } from "./score.controller.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js"

const router = express();
const scoreController = new ScoreController();

router.get("/match/:match_id", asyncHandler(scoreController.getScoreByMatchId.bind(scoreController)));

export default router;