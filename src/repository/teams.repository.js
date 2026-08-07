import Team from "../model/team.model.js"

export class TeamRepo {
  async findAll () {
    return await Team.find({ isDeleted: false });
  } 
  async findById (id) {
    return await Team.findOne({ _id: id, isDeleted: false });
  } 
  async findOne (filter) {
    return await Team.findOne({ ...filter, isDeleted: false });
  } 
}