import axios from "axios";

import { 
    GET_ENTITY_LIST, GET_ENTITY_DETAIL, UPDATE_ENTITY, CREATE_ENTITY, DELETE_ENTITY, GET_ENTITY_LIST_NO_FILTER,
    GET_USER_LIST, GET_USER_DETAIL, UPDATE_USER, CREATE_USER, DELETE_USER } from "../actions";

const url = "http://192.168.1.11:5000";
//const url = "";
//const url = "https://35.236.219.177:5000";


// Get Entity List
export const getEntityList = (filter) => (dispatch) => {
    axios
        .post(url + "/entity/get/filtered", filter)
        .then(res => {
            dispatch({
                type: GET_ENTITY_LIST,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Get Entity List
export const getEntityListNoFilter = (body) => (dispatch) => {
    axios
        .post(url + "/entity/get-all-no-filter", body)
        .then(res => {
            dispatch({
                type: GET_ENTITY_LIST_NO_FILTER,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Get Entity Detail
export const getEntityDetail = (body) => (dispatch) => {
    axios
        .post(url + "/entity/get", body)
        .then(res => {
            dispatch({
                type: GET_ENTITY_DETAIL,
                payload: res.data.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Update Entity
export const updateEntity = (body) => (dispatch) => {

    console.log(body);

    axios
        .post(url + "/entity/update", body)
        .then(res => {
            dispatch({
                type: UPDATE_ENTITY,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Update Entity
export const createEntity = (body) => (dispatch) => {

    console.log(body);

    axios
        .post(url + "/entity/create", body)
        .then(res => {
            dispatch({
                type: CREATE_ENTITY,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Delete Entity
export const deleteEntity = (body) => (dispatch) => {

    console.log(body);

    axios
        .post(url + "/entity/delete", body)
        .then(res => {
            dispatch({
                type: DELETE_ENTITY,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Get User List
export const getUserList = (filter) => (dispatch) => {

    axios
        .post(url + "/user/get/filtered", filter)
        .then(res => {
            dispatch({
                type: GET_USER_LIST,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Get User Detail
export const getUserDetail = (body) => (dispatch) => {
    axios
        .post(url + "/user/get", body)
        .then(res => {
            dispatch({
                type: GET_USER_DETAIL,
                payload: res.data.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Update User
export const updateUser = (body) => (dispatch) => {

    console.log(body);

    axios
        .post(url + "/user/update", body)
        .then(res => {
            dispatch({
                type: UPDATE_USER,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Update User
export const createUser = (body) => (dispatch) => {

    console.log(body);

    axios
        .post(url + "/user/create", body)
        .then(res => {
            dispatch({
                type: CREATE_USER,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Delete User
export const deleteUser = (body) => (dispatch) => {

    console.log(body);

    axios
        .post(url + "/user/delete", body)
        .then(res => {
            dispatch({
                type: DELETE_USER,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}