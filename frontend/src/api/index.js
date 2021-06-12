import axios from "axios";

const baseURL = "http://localhost:5000";

export const getTeams = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/teams/get`);
    return data;
  } catch (error) {
    return [];
  }
};

export const getLimitedMatches = async (teamName) => {
  try {
    const { data } = await axios.get(`${baseURL}/matches/${teamName}/4`);
    return data;
  } catch (error) {
    return [];
  }
};

export const getAllYears = async (teamName) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/teams/get/years?teamname=${teamName}`
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const getMatchesForYear = async (teamName, season) => {
  try {
    const { data } = await axios.get(
      `${baseURL}/matches/${teamName}?season=${season}`
    );
    return data;
  } catch (error) {
    return [];
  }
};

export const getMatchStats = async (teamName) => {
  try {
    const { data } = await axios.get(`${baseURL}/matches/${teamName}/stats`);
    return data;
  } catch (error) {
    return [];
  }
};
