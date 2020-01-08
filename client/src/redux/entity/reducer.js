import { 
    GET_ENTITY_LIST, GET_ENTITY_DETAIL, UPDATE_ENTITY, CREATE_ENTITY, DELETE_ENTITY, GET_ENTITY_LIST_NO_FILTER, 
    GET_USER_LIST, GET_USER_DETAIL, UPDATE_USER, CREATE_USER, DELETE_USER } from "../actions";

const INIT_STATE = {
    loading: false,
    error: '',
    entityList: [],
    entityDetail: [],
    entityUpdate: [],
    entityCreate: [],
    entityDelete: [],
    entityListNoFilter: [],
    userList: [],
    userDetail: [],
    userUpdate: [],
    userCreate: [],
    userDelete: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ENTITY_LIST:
            return { ...state, entityList: action.payload };
        case GET_ENTITY_DETAIL:
            return { ...state, entityDetail: action.payload };
        case UPDATE_ENTITY:
            return { ...state, entityUpdate: action.payload };
        case CREATE_ENTITY:
            return { ...state, entityCreate: action.payload };
        case DELETE_ENTITY:
            return { ...state, entityDelete: action.payload };
        case GET_ENTITY_LIST_NO_FILTER:
            return { ...state, entityListNoFilter: action.payload };
        case GET_USER_LIST:
            return { ...state, userList: action.payload };
        case GET_USER_DETAIL:
            return { ...state, userDetail: action.payload };
        case UPDATE_USER:
            return { ...state, userUpdate: action.payload };
        case CREATE_USER:
            return { ...state, userCreate: action.payload };
        case DELETE_USER:
            return { ...state, userDelete: action.payload };
        default:
            return state;
    }
};