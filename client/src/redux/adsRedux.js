import { API_URL } from "../config";

//selectors
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, id) => ads.find(ad => ad._id === id)

//actions
const createActionName = actionName => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');

// action creators
export const loadAds = payload => ({ type: LOAD_ADS, payload });

//API requests
export const fetchAds = () => {
  return (dispatch) => {
  fetch(API_URL + '/api/ads')
    .then(res => res.json())
    .then(ads => dispatch(loadAds(ads)))
  };
};

//reducer
const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_ADS:
      return [...action.payload];
    default:
      return statePart;
  };
};

export default adsReducer;
