import { ScoreRepo } from "../../../repository/score.repository.js";

export class ScoreService {
  constructor () {
    this.scoreRepo = new ScoreRepo();
  }

  async getScoreByMatchId(match_id) {
    return await this.scoreRepo.getScoreByMatchId(match_id);
  }
}