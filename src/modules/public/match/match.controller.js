import { StatusCodes } from "http-status-codes";
import { buildSuccessResponse } from "../../../shared/error/buildSuccessResponse.js";
import { MatchService } from "./match.service.js";

export class MatchController {
  constructor() {
    this.matchService = new MatchService();
  }

  async getMatches (req, res) {
    return buildSuccessResponse(res, "Matches retrived",StatusCodes.OK , await this.matchService.getMatches());
  }

  async getaMatchBySeriesId (req, res) {
    return buildSuccessResponse(res, `Matches with series_id ${req.params.series_id} retrived`,StatusCodes.OK , await this.matchService.getaMatchBySeriesId(req.params.series_id));
  }

  async getMatchById (req, res) {
    return buildSuccessResponse(res, `Match with ${req.params.id} Id retrived`,StatusCodes.OK , await this.matchService.getMatchById(req.params.id));
  }
}