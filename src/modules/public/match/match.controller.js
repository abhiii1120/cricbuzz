import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import { MatchService } from "./match.service.js";

export class MatchController {
  constructor() {
    this.matchService = new MatchService();
  }

  async getMatches (req, res) {
    return buildSuccessResponse(res, "Matches retrived",  await this.matchService.getMatches());
  }

  async getaMatchBySeriesId (req, res) {
    return buildSuccessResponse(res, `Matches with series_id ${req.params.series_id} retrived`, await this.matchService.getaMatchBySeriesId(req.params.series_id));
  }

  async getMatchById (req, res) {
    return buildSuccessResponse(res, `Match with ${req.params.id} Id retrived`, await this.matchService.getMatchById(req.params.id));
  }
}