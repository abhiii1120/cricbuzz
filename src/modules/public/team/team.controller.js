import { TeamService } from "./team.service.js"
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js"

export class TeamController {
  constructor () {
    this.teamService = new TeamService();
  }

  async getTeams (req, res) {
    return buildSuccessResponse(res, `Team by ${req.params.id} Id`, await this.teamService.getTeams());
  }
  async getTeamById (req, res) {
    return buildSuccessResponse(res, `Team by ${req.params.id} Id`, await this.teamService.getTeamById(req.params.id));
  }
}