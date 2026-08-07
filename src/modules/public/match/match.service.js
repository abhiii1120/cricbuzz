import { matchRepo } from "../../../repository/match.repository.js";

export class MatchService {
  constructor() {
    this.matchRepo = new this.matchRepo();
  }

  async getMatches() {
    return await this.matchRepo.findAll();
  }

  async getaMatchBySeriesId(seriesId) {
    return await this.matchRepo.findAll(seriesId);
  }

  async getMatchById(id) {
    return await this.matchRepo.findById(id);
  }
}
