import Score from "../model/score.model.js"

export class ScoreRepo {
  async getScoreByMatchId(matchId) {
    return await Score.find({ matchId })
  }
}