import Series from "../model/series.model.js"

export class SeriesRepo {
  async findAll () {
    return Series.find({ isDeleted: false });
  }

  async findById (id) { 
    return Series.findOne({ _id: id, isDeleted: false });
  }
}