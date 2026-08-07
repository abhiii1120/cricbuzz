import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import { ScoreService } from "./score.service.js";

export class ScoreController {
  constructor() {
    this.scoreService = new ScoreService();
  }

  async getScoreByMatchId(req, res) {
    return buildSuccessResponse(res, `Score Retrived by match_id: ${req.params.match_id}`, await this.scoreService.getScoreByMatchId(req.params.match_id))
  }
}