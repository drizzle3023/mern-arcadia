import {createResponse} from "../globals/utils.js";
import {responseMessages, apis} from "../globals/defines.js";

const express = require("express");
const siteRouter = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const csvtojson = require('csvtojson');
const axios = require('axios');

const siteModel = require("../models/site.js");
siteRouter.use(cors());

process.env.SECRET_KEY = 'secret';

siteRouter.post("/create", (req, res) => {

    siteModel.create(req.body.site)
        .then(site => {
            res.json(createResponse(site, responseMessages.ok));
        })
        .catch(error => {
            res.json(createResponse(error, responseMessages.dbError));
        });

    //
    // siteModel.findOne({
    //     _id: req.body._id
    // })
    //     .then(site => {
    //         if (!site) {
    //             res.json(createResponse(null, responseMessages.alreadyExist));
    //         } else {
    //
    //         }
    //     })
    //     .catch(err => {
    //         res.json(createResponse())
    //     })
});

siteRouter.post('/get', (req, res) => {

    siteModel.find({
        _id: req.body._id
    })
        .then(siteList => {
            var siteData = siteList[0];
            if (siteData) {
                console.log(siteData);
                res.json(createResponse(siteData));
            }
            else {
                res.json(createResponse(null, responseMessages.error));
            }
        });
});

siteRouter.post('/getWeather', (req, res) => {

    siteModel.find({
        _id: req.body._id
    })
        .then(siteList => {
            var siteData = siteList[0];
            if (siteData) {
                console.log(siteData);

                var apiRequestURL = apis.weatherAPI_GeoPositionURL
                    + '?apikey=' + apis.weatherAPIKey + '&q=' + siteData.latitude + ',' + siteData.longitude
                    + '&details=true';
                console.log(apiRequestURL);
                axios.get(apiRequestURL)
                    .then(response => {
                        console.log("response======================");
                        console.log(response);

                        if (response && response.data && response.data.Key) {
                            var weatherAPIGeoPositionKey = response.data.Key;
                            var apiRequestURL = apis.weatherAPI_CurrentConditionURL + weatherAPIGeoPositionKey + '?apikey=' + apis.weatherAPIKey;
                            console.log(apiRequestURL);
                            axios.get(apiRequestURL)
                                .then(response => {
                                    console.log("response======================");
                                    console.log(response);

                                    if (response && response.data && response.data[0]) {
                                        var weatherData = response.data[0];
                                        var data = {};
                                        data.weatherText = weatherData.WeatherText;
                                        data.weatherIcon = weatherData.WeatherIcon;
                                        if (weatherData.Temperature) {
                                            if (weatherData.Temperature.Metric) {
                                                data.weatherMetric = weatherData.Temperature.Metric.Value + ' ' + weatherData.Temperature.Metric.Unit;
                                            }
                                            if (weatherData.Temperature.Imperial) {
                                                data.weatherImperial = weatherData.Temperature.Imperial.Value + ' ' + weatherData.Temperature.Imperial.Unit;
                                            }
                                        }
                                        res.json(createResponse(data));
                                    } else {
                                        res.json(createResponse(null, responseMessages.notExist));
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.json(createResponse(null, responseMessages.error));
                                });
                        }
                        else {
                            res.json(createResponse(null, responseMessages.notExist));
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.json(createResponse(null, responseMessages.error));
                    });
            }
            else {
                res.json(createResponse(null, responseMessages.notExist));
            }
        });
});

siteRouter.post('/getLand', (req, res) => {

    siteModel.find({
        _id: req.body._id
    })
        .then(siteList => {
            var siteData = siteList[0];
            if (siteData) {
                console.log(siteData);

                var apiRequestURL = apis.geocodingAPIURL + 'latlng=' + siteData.latitude + ',' + siteData.longitude + '&key=' + apis.geocodingAPIKey;
                console.log(apiRequestURL);
                axios.get(apiRequestURL)
                    .then(response => {
                        console.log("response======================");
                        console.log(response);

                        if (response && response.data && response.data.results && response.data.results[0]) {
                            //var geocodingData = response.data;
                            var geocodingResult = response.data.results[0];
                            console.log(geocodingResult.formatted_address);
                            var combinedAddress = geocodingResult.formatted_address;

                            var apiRequestURL = apis.estatedAPIURL + apis.estatedAPIToken + '&combined_address=' + combinedAddress;
                            console.log(apiRequestURL);
                            axios.get(apiRequestURL)
                                .then(response => {
                                    console.log("response======================");
                                    console.log(response);
                                    if (response && response.data && response.data.data) {

                                        var estatedData = response.data.data;
                                        var data = {};
                                        if (estatedData.parcel) {
                                            var parcel = estatedData.parcel;
                                            data.parcelAPNOriginal = parcel.apn_original;
                                            data.parcelFIPSCode = parcel.fips_code;
                                            data.parcelCountyLandUseCode = parcel.county_land_use_code;
                                            data.parcelCountyLandUseDesc = parcel.county_land_use_description;
                                            data.parcelTaxAccountNumber = parcel.tax_account_number;
                                            data.parcelLegalDesc = parcel.legal_description;
                                        }
                                        if (estatedData.taxes && estatedData.taxes[0]) {
                                            var tax = estatedData.taxes[0];
                                            data.taxesAmount = tax.amount;
                                            data.taxesExemptions = tax.exemptions;
                                        }
                                        if (estatedData.assessments && estatedData.assessments[0]) {
                                            var assessment = estatedData.assessments[0];
                                            data.assessmentsYear = assessment.year;
                                            data.assessmentsLandValue = assessment.land_value;
                                            data.assessmentsImprovementValue = assessment.improvement_value;
                                            data.assessmentsTotalValue = assessment.total_value;
                                        }
                                        if (estatedData.owner) {
                                            var owner = estatedData.owner;
                                            data.ownerName = owner.name;
                                            data.ownerSecondName = owner.second_name || '';
                                        }
                                        res.json(createResponse(data));
                                    } else {
                                        res.json(createResponse(null, responseMessages.notExist));
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.json(createResponse(null, responseMessages.error));
                                });
                        }
                        else {
                            res.json(createResponse(null, responseMessages.notExist));
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.json(createResponse(null, responseMessages.error));
                    });
            }
            else {
                res.json(createResponse(null, responseMessages.notExist));
            }
        });
});

siteRouter.post('/get/filtered', (req, res) => {

    let pageNumber = req.body.pageNumber;
    let pageSize = req.body.pageSize;
    let filter = req.body.filter || '';
    filter = filter.trim();
    if (filter.toLowerCase().startsWith("all")) {
        filter = '';
    }

    if (filter === '') {
        siteModel.count().then((totalCount) => {
            siteModel.find()
                .skip(pageNumber * pageSize)
                .limit(pageSize)
                .then(siteList => {
                    res.json(createResponse({
                        items: siteList,
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
                    { siteCode: { $regex: filter }},
                    { siteName: { $regex: filter }},
                    { city: { $regex: filter }},
                    { state: { $regex: filter }},
                    { zip: { $regex: filter }},
                    { county: { $regex: filter }},
                    { contact: { $regex: filter }},
                    { phone: { $regex: filter }},
                    { email: { $regex: filter }}
                ]
            };

        siteModel.count(condition).then((totalCount) => {
            siteModel.find(condition)
                .skip(pageNumber * pageSize)
                .limit(pageSize)
                .then(siteList => {
                    res.json(createResponse({
                        items: siteList,
                        totalCount,
                        pageSize,
                        pageNumber,
                        filter
                    }));
                });
        });
    }
});

siteRouter.post('/upload-csv', (req, res) => {

    let csvData = req.files.file.data.toString('utf8');

    csvtojson().fromString(csvData).then(json => {

        siteModel.create(json.map(old => ({
            'siteCode': old['Site Code'],
            'siteName': old['Site Name'],
            'latitude': old['Latitude'],
            'longitude': old['Longitude'],
            'city': old['City'],
            'state': old['State'],
            'zip': old['Zip'],
            'county': old['County'],
            'type': old['Type'],
            'height': old['Height'],
            'mta': old['MTA'],
            'bta': old['BTA'],
            'contact': old['Contact'],
            'phone': old['Phone'],
            'email': old['Email'],
            'rsm': old['RSM'],
            'rsmEmail': old['RSM Email']
        })))
            .then(site => {
                res.json(createResponse(json, responseMessages.ok));
            })
            .catch(error => {
                res.json(createResponse(error, responseMessages.dbError));
            });

    });

});

module.exports = siteRouter;
