import { PlayerRepo } from "../../../repository/player.repository.js";
import NotFound from "../../../shared/error/notFound.error.js"

export class playerService {
  constructor () {
    this.playerRepo = new PlayerRepo();
  }

  async getPlayers () {
    return this.playerRepo.findAll();
  } 

  async getPlayerById (id) {
    const player = await this.playerRepo.findById(id);
    if (!player) throw new NotFound("Player not found");
    return player;
  }
}