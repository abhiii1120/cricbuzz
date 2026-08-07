import { TeamRepo } from "../../../repository/teams.repository.js";
import NotFound from "../../../shared/error/notFound.error.js"

export class TeamService {
  constructor () {
    this.TeamRepo = new TeamRepo();
  }

  async getTeams () {
    return await this.TeamRepo.findAll();
  } 
  async getTeamById (id) {
    const team = await this.TeamRepo.findById(id);
    if (!team) throw new NotFound("Team not found");
    return team;
  }
}