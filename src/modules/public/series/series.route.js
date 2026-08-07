import express from "express";
import { SeriesController } from "./series.controller.js";
import { asyncHandler } from "../../../shared/error/asyncHandler.js";

const router =  express.Router();
const seriesController = new SeriesController();

router.get("/", asyncHandler(seriesController.getSeries.bind(seriesController)));
router.get("/:id", asyncHandler(seriesController.getSeriesById.bind(seriesController)));

export default router;