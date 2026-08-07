import matchModel from "../model/match.model.js"

export class MatchRepo {
  async findAll(id) {
    return matchModel.find(
      id ? { seriesId: id, isDeleted: false } : { isDeleted: false },
    ).populate("team1","name shortName logo")
    .populate("team2","name shortName logo")
    .populate("tossWinner","name shortName logo")
  }

  async findbyId(id){
    return MatchRepo.findOne({
        _id:id,
        isDeleted:false,
    })
    .populate("seriesId")
    .populate("team1")
    .populate("team2")
    .populate("tossWinner")
    .populate({
        path:"playingXI.team1.player",
        select:"name role image",
    })
    .populate({
        path:"playingXI.team2.player",
        select:"name role image",
    })
}
}


