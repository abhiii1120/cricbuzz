import express from "express";
import { MatchController } from "./match.controller.js";
const router =  express.Router();

const matchController = new MatchController();

router.get("/", matchController.getMatches.bind(matchController));
router.get("/series/:series_id", matchController.getaMatchBySeriesId.bind(matchController));
router.get("/:id", matchController.getMatchById.bind(matchController));

export default router;