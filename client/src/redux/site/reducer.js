import { UPLOAD_CSV_SUCCESS, GET_SITE_LIST, GET_SITE_DETAIL, GET_WEATHER, GET_LAND } from "../actions";

const INIT_STATE = {
    loading: false,
    error: '',
    siteList: [],
    siteDetail: [],
    weather: [],
    land: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPLOAD_CSV_SUCCESS:
            return { ...state, loading: false, error: '' };
        case GET_SITE_LIST:
            return { ...state, siteList: action.payload };
        case GET_SITE_DETAIL:
            return { ...state, siteDetail: action.payload };
        case GET_WEATHER:
            return { ...state, weather: action.payload };
        case GET_LAND:
            return { ...state, land: action.payload };
        default:
            return state;
    }
};