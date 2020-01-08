import axios from "axios";

import { UPLOAD_CSV_SUCCESS, GET_SITE_LIST, GET_SITE_DETAIL, GET_WEATHER, GET_LAND } from "../actions";

const url = "http://192.168.1.11:5000";
//const url = "";
//const url = "https://35.236.219.177:5000";

// Upload CSV
export const uploadCSV = file => (dispatch) => {
    axios
        .post(url + "/site/upload-csv", file)
        .then(res => {
            dispatch({
                type: UPLOAD_CSV_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err.response.data);
        });
};

// Get Site List
export const getSiteList = (filter) => (dispatch) => {
    axios
        .post(url + "/site/get/filtered", filter)
        .then(res => {
            dispatch({
                type: GET_SITE_LIST,
                payload: res.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Get Site Detail
export const getSiteDetail = (body) => (dispatch) => {
    axios
        .post(url + "/site/get", body)
        .then(res => {
            dispatch({
                type: GET_SITE_DETAIL,
                payload: res.data.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Get Weather
export const getWeather = (body) => (dispatch) => {
    axios
        .post(url + "/site/getWeather", body)
        .then(res => {
            dispatch({
                type: GET_WEATHER,
                payload: res.data.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}

// Get Land
export const getLand = (body) => (dispatch) => {
    axios
        .post(url + "/site/getLand", body)
        .then(res => {
            dispatch({
                type: GET_LAND,
                payload: res.data.data
            });
        })
        .catch(err =>
            console.log(err.response.data)
        );
}