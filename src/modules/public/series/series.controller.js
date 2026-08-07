import { SeriesService } from "./series.service.js";
import { buildSuccessResponse } from "../../../shared/error/buildSuccessResponse.js";

export class SeriesController {
  constructor () {
    this.seriesService = new SeriesService();
  }
  async getSeries (req, res) {
    return buildSuccessResponse(res, "Series retrived",  await this.seriesService.getSeries());
  }

  async getSeriesById(req, res) {
    return buildSuccessResponse(res, `Series by ${req.params.id} Id retrived`,  await this.seriesService.getSeriesById(req.params.id));
  }
}