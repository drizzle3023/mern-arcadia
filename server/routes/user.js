import {createResponse} from "../globals/utils.js";
import {responseMessages, apis} from "../globals/defines.js";

const express = require("express");
const userRouter = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const csvtojson = require('csvtojson');
const axios = require('axios');

const userModel = require("../models/user.js");
userRouter.use(cors());

process.env.SECRET_KEY = 'secret';

userRouter.post('/get', (req, res) => {

    userModel.findOne({
        _id: req.body._id
    })
        .populate("entity")
        .then(userData => {
            if (userData) {
                console.log(userData);
                res.json(createResponse(userData));
            }
            else {
                res.json(createResponse(null, responseMessages.error));
            }
        });
});

userRouter.post("/update", (req, res) => {

    console.log("update request: " + req.body._id);

    userModel.findOne({
        _id: req.body._id
    }, function(err, userData){
        if (!err){
            if (!userData){
                console.log("update db error");
                res.json(createResponse(err, responseMessages.dbError));
            }
            userData.userName = req.body.userName;
            userData.userEmail = req.body.userEmail;
            userData.entity = req.body.entity;
            userData.userPassword = req.body.userPassword;
            userData.userPhoneNumber = req.body.userPhoneNumber;
            userData.save(function(err){
                if (!err){
                    console.log("update success");
                    res.json(createResponse(null, responseMessages.ok));
                } else {
                    console.log("update failure");
                    res.json(createResponse(err, responseMessages.error));
                }
            });
        } else {
            console.log("update error");
        }
    });

});

userRouter.post("/create", (req, res) => {

    console.log("create request: ");

    var userData = {
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPhoneNumber: req.body.userPhoneNumber,
        userPassword: req.body.userPassword,
        entity: req.body.entity
    };

    new userModel(userData).save(

        function(err){
            if (!err){
                console.log("create success");
                res.json(createResponse(null, responseMessages.ok));
            } else {
                console.log("create failure");
                console.log(err);
                res.json(createResponse(err, responseMessages.error));
            }
    });

});

userRouter.post("/delete", (req, res) => {

    console.log("delete request: " + req.body.userId);

    userModel.findOne({
        _id: req.body.userId
    }, function(err, userData){
        if (!err){
            if (!userData){
                console.log("db error");
                res.json(createResponse(err, responseMessages.dbError));
            }
            userData.deleteOne(function(err){
                if (!err){
                    console.log("delete success");
                    res.json(createResponse(null, responseMessages.ok));
                } else {
                    console.log("delete failure");
                    res.json(createResponse(err, responseMessages.error));
                }
            });
        } else {
            console.log("delete error");
        }
    });

});

userRouter.post('/get/filtered', (req, res) => {

    let pageNumber = req.body.pageNumber;
    let pageSize = req.body.pageSize;
    let filter = req.body.filter || '';
    filter = filter.trim();
    if (filter.toLowerCase().startsWith("all")) {
        filter = '';
    }

    if (filter === '') {
        userModel.count().then((totalCount) => {
            userModel.find()
                .populate('entity')
                .skip(pageNumber * pageSize)
                .limit(pageSize)
                .then(userList => {

                    console.log(userList);

                    res.json(createResponse({
                        items: userList,
                        totalCount,
                        pageSize,
                        pageNumber,
                        filter
                    }));
                });
        });
    }
    else {
        let condition = {
                $or: [
                    { userName: { $regex: filter }}
                ]
            };

        userModel.count(condition).then((totalCount) => {
            userModel.find(condition)
                .populate('entity')
                .skip(pageNumber * pageSize)
                .limit(pageSize)
                .then(userList => {

                    console.log(userList);

                    res.json(createResponse({
                        items: userList,
                        totalCount,
                        pageSize,
                        pageNumber,
                        filter
                    }));
                });
        });
    }
});

module.exports = userRouter;
