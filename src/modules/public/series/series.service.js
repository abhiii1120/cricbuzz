import { SeriesRepo } from "../../../repository/series.repository.js";

export class SeriesService {
  constructor () {
    this.seriesRepository = new SeriesRepo()
  }

  async getSeries () {
    return await this.seriesRepository.findAll();
  } 
  
  async getSeriesById (id) {
    return await this.seriesRepository.findById(id);
  } 
}