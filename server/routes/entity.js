import {createResponse} from "../globals/utils.js";
import {responseMessages, apis} from "../globals/defines.js";

const express = require("express");
const entityRouter = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const csvtojson = require('csvtojson');
const axios = require('axios');

const entityModel = require("../models/entity.js");
entityRouter.use(cors());

process.env.SECRET_KEY = 'secret';

// entityRouter.post("/create", (req, res) => {

//     entityModel.create(req.body.entity)
//         .then(entity => {
//             res.json(createResponse(entity, responseMessages.ok));
//         })
//         .catch(error => {
//             res.json(createResponse(error, responseMessages.dbError));
//         });

//     //
//     // siteModel.findOne({
//     //     _id: req.body._id
//     // })
//     //     .then(site => {
//     //         if (!site) {
//     //             res.json(createResponse(null, responseMessages.alreadyExist));
//     //         } else {
//     //
//     //         }
//     //     })
//     //     .catch(err => {
//     //         res.json(createResponse())
//     //     })
// });

entityRouter.post('/get', (req, res) => {

    entityModel.findOne({
        _id: req.body._id
    })
        .then(entityData => {
            if (entityData) {
                console.log(entityData);
                res.json(createResponse(entityData));
            }
            else {
                res.json(createResponse(null, responseMessages.error));
            }
        });
});

entityRouter.post("/update", (req, res) => {

    console.log("update request: " + req.body._id);

    entityModel.findOne({
        _id: req.body._id
    }, function(err, entityData){
        if (!err){
            if (!entityData){
                console.log("update db error");
                res.json(createResponse(err, responseMessages.dbError));
            }
            entityData.entityName = req.body.entityName;
            entityData.entityEmail = req.body.entityEmail;
            entityData.entityAddress = req.body.entityAddress;
            entityData.save(function(err){
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

entityRouter.post("/create", (req, res) => {

    console.log("create request: ");

    var entityData = {
        entityName: req.body.entityName,
        entityEmail: req.body.entityEmail,
        entityAddress: req.body.entityAddress
    };

    new entityModel(entityData).save(

        function(err){
            if (!err){
                console.log("create success");
                res.json(createResponse(null, responseMessages.ok));
            } else {
                console.log("create failure");
                res.json(createResponse(err, responseMessages.error));
            }
    });

});

entityRouter.post("/delete", (req, res) => {

    console.log("delete request: " + req.body.entityId);

    entityModel.findOne({
        _id: req.body.entityId
    }, function(err, entityData){
        if (!err){
            if (!entityData){
                console.log("db error");
                res.json(createResponse(err, responseMessages.dbError));
            }
            entityData.deleteOne(function(err){
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

entityRouter.post('/get/filtered', (req, res) => {

    let pageNumber = req.body.pageNumber;
    let pageSize = req.body.pageSize;
    let filter = req.body.filter || '';
    filter = filter.trim();
    if (filter.toLowerCase().startsWith("all")) {
        filter = '';
    }

    if (filter === '') {
        entityModel.count().then((totalCount) => {
            entityModel.find()
                .skip(pageNumber * pageSize)
                .limit(pageSize)
                .then(entityList => {
                    res.json(createResponse({
                        items: entityList,
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
                    { entityName: { $regex: filter }}
                ]
            };

        entityModel.count(condition).then((totalCount) => {
            entityModel.find(condition)
                .skip(pageNumber * pageSize)
                .limit(pageSize)
                .then(entityList => {
                    res.json(createResponse({
                        items: entityList,
                        totalCount,
                        pageSize,
                        pageNumber,
                        filter
                    }));
                });
        });
    }
});

entityRouter.post('/get-all-no-filter', (req, res) => {

    entityModel.count().then((totalCount) => {
        entityModel.find()
            .then(entityList => {
                res.json(createResponse({
                    items: entityList,
                    totalCount
                }));
            });
    });
});

module.exports = entityRouter;
