const seriesRepository = require("./series.repository");

const getAllSeries = async () => {
  return await seriesRepository.findAll();
};

const getSeriesById = async (id) => {
  return await seriesRepository.findById(id);
};

const createSeries = async (data) => {
  const {
    seasonId,
    redTeamId,
    blueTeamId,
    bestOf,
    status,
    winnerTeamId,
    startDate,
    endDate,
  } = data;
  return await seriesRepository.create({
    seasonId,
    redTeamId,
    blueTeamId,
    bestOf,
    status,
    winnerTeamId,
    startDate,
    endDate: endDate ? endDate : null,
  });
};

const updateSeries = async (id, data) => {
  const {
    seasonId,
    redTeamId,
    blueTeamId,
    bestOf,
    status,
    winnerTeamId,
    startDate,
    endDate,
  } = data;
  return await seriesRepository.update(id, {
    seasonId,
    redTeamId,
    blueTeamId,
    bestOf,
    status,
    winnerTeamId,
    startDate,
    endDate,
  });
};

const deleteSeries = async (id) => {
  return await seriesRepository.remove(id);
};

module.exports = {
  getAllSeries,
  getSeriesById,
  createSeries,
  updateSeries,
  deleteSeries,
};
