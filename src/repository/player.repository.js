import player from "../model/player.model";

export class PlayerRepo {
  async findAll() {
    return player.find({ isDeleted: false });
  }

  async findById(id) {
    return player.findOne({ _id: id, isDeleted: false });
  }
}
