const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({

    siteCode: {
        type: String
    },
    siteName: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    county: {
        type: String
    },
    type: {
        type: String
    },
    height: {
        type: String
    },
    mta: {
        type: String
    },
    bta: {
        type: String
    },
    contact: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    rsm: {
        type: String
    },
    rsmEmail: {
        type: String
    },
//////////////////////////////////////////////////////////
    regDate: {
        type: Date,
        default: Date.now
    },
    siteId: {
        type: String
    },
    siteLocation: {
        type: String
    },
    e911Addr: {
        type: String
    },
    buildingOwner: {
        type: String
    },
    keyCombo: {
        type: String
    },
    auditorName: {
        type: String
    },
    arriveTime: {
        type: String
    },
    checkTime: {
        type: String
    },
    completeTime: {
        type: String
    },
    departTime: {
        type: String
    },
    section2_1: {
        type: String
    },
    section2_2: {
        type: String
    },
    section2_3: {
        type: String
    },
    section2_4: {
        type: String
    },
    section2_5Len: {
        type: String
    },
    section2_5Width: {
        type: String
    },
    section2_5Height: {
        type: String
    },
    section2_6: {
        type: String
    },
    section2_7Len: {
        type: String
    },
    section2_7Width: {
        type: String
    },
    section2_7Height: {
        type: String
    },
    section3_1: {
        type: String
    },
    section3_2: {
        type: String
    },
    section3_3: {
        type: String
    },
    section3_4: {
        type: String
    },
    section3_5: {
        type: String
    },
    section3_6: {
        type: String
    },
    section3_7: {
        type: String
    },
    section3_8: {
        type: String
    },
    section3_9: {
        type: String
    },
    section3_10: {
        type: String
    },
    section3_11: {
        type: String
    },
    section3_12: {
        type: String
    },
    section3_13: {
        type: String
    },
    section3_14: {
        type: String
    },
    section3_15: {
        type: String
    },
    section4_1: {
        type: String
    },
    section4_2: {
        type: String
    },
    section4_3: {
        type: String
    },
    section4_4: {
        type: String
    },
    section4_5: {
        type: String
    },
    section4_6: {
        type: String
    },
    section4_7: {
        type: String
    },
    section4_8: {
        type: String
    },
    section4_9: {
        type: String
    },
    section4_10: {
        type: String
    },
    section4_11: {
        type: String
    },
    section4_12: {
        type: String
    },
    section4_13: {
        type: String
    },
    section4_14: {
        type: String
    },
    section4_15: {
        type: String
    },
    section4_16: {
        type: String
    },
    section4_17: {
        type: String
    },
    section4_18: {
        type: String
    },
    section4_19: {
        type: String
    },
    section5_1: {
        type: String
    },
    section5_2: {
        type: String
    },
    section5_3: {
        type: String
    },
    section6_1: {
        type: String
    },
    section6_2: {
        type: String
    },
    section6_3: {
        type: String
    },
    section6_4: {
        type: String
    },
    section7_1: {
        type: String
    },
    section7_2: {
        type: String
    },
    section7_3: {
        type: String
    },
    section7_4: {
        type: String
    },
    section7_5: {
        type: String
    },
    section8_1: {
        type: String
    },
    section8_2: {
        type: String
    },
    section8_3: {
        type: String
    },
    section8_4: {
        type: String
    },
    section8_5: {
        type: String
    },
    section8_6: {
        type: String
    },
    section8_7: {
        type: String
    },
    section8_8: {
        type: String
    },
    section8_9: {
        type: String
    },
    section8_10: {
        type: String
    },
    section8_11: {
        type: String
    },
    section8_12: {
        type: String
    },
    section8_13: {
        type: String
    },
    section8_14: {
        type: String
    },
    section8_15: {
        type: String
    },
    section8_16: {
        type: String
    },
    section8_17: {
        type: String
    },
    section9_1: {
        type: String
    },
    section9_2: {
        type: String
    },
    section9_3: {
        type: String
    },
    section9_4: {
        type: String
    },
    section9_5: {
        type: String
    },
    section9_6: {
        type: String
    },
    section9_7: {
        type: String
    },
    section9_8: {
        type: String
    },
    section9_9: {
        type: String
    },
    section9_10: {
        type: String
    },
    section9_11: {
        type: String
    },
    section9_12: {
        type: String
    },
    section9_13: {
        type: String
    },
    section9_14: {
        type: String
    },
    section9_15: {
        type: String
    },
    section9_16: {
        type: String
    },
    section9_17: {
        type: String
    },
    section9_18: {
        type: String
    },
    section9_19: {
        type: String
    },
    section9_20: {
        type: String
    },
    section9_21: {
        type: String
    },
    //////////////////////////////////////////////////////////
    weatherText: {
        type: String
    },
    weatherIcon: {
        type: String
    },
    weatherMetric: {
        type: String
    },
    weatherImperial: {
        type: String
    },
    //////////////////////////////////////////////////////////
    parcelAPNOriginal: {
        type: String
    },
    parcelFIPSCode: {
        type: String
    },
    parcelCountyLandUseCode: {
        type: String
    },
    parcelCountyLandUseDesc: {
        type: String
    },
    parcelTaxAccountNumber: {
        type: String
    },
    parcelLegalDesc: {
        type: String
    },
    taxesAmount: {
        type: String
    },
    taxesExemptions: {
        type: String
    },
    assessmentsYear: {
        type: String
    },
    assessmentsLandValue: {
        type: String
    },
    assessmentsImprovementValue: {
        type: String
    },
    assessmentsTotalValue: {
        type: String
    },
    ownerName: {
        type: String
    },
    ownerSecondName: {
        type: String
    },
});

module.exports = mongoose.model('site', siteSchema);
