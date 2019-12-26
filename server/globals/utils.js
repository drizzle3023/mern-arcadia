import {responseMessages} from "./defines";

let createResponse = (data = null, message = responseMessages.ok) => ({
    data: data,
    message: message
});

export {createResponse};
