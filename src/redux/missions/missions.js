/* eslint-disable camelcase */
import axios from 'axios';

const FETCH_MISSIONS_SUCCESS = 'spacex/missions/FETCH_MISSIONS_SUCCESS';
const FETCH_MISSIONS_FAIL = 'space/missions/FETCH_MISSIONS_FAIL';
const URL = 'https://api.spacexdata.com/v3/missions';

const initialState = [];

const fetchSuccess = (missions) => ({
  type: FETCH_MISSIONS_SUCCESS,
  payload: missions,
});

const fetchFailed = (payload) => ({
  type: FETCH_MISSIONS_FAIL,
  payload,
});

const getItemsFromResponse = (response) => {
  const info = [];
  response.forEach((item) => {
    const { mission_id, mission_name, description } = item;
    info.push({ mission_id, mission_name, description });
  });
  return info;
};

export const fetchMissions = () => async (dispatch) => {
  try {
    const response = await axios({
      method: 'get',
      url: URL,
    });

    dispatch(fetchSuccess(getItemsFromResponse(response.data)));
  } catch (err) {
    dispatch(fetchFailed(err.toString()));
  }
};

const missionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MISSIONS_SUCCESS:
      return [...action.payload];
    case FETCH_MISSIONS_FAIL:
      return [];

    default:
      return state;
  }
};

export default missionReducer;
