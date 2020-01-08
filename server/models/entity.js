const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entitySchema = new Schema({

    entityName: {
        type: String
    },
    entityEmail: {
        type: String
    },
    entityAddress: {
        type: String
    },
});

module.exports = mongoose.model('entity', entitySchema);
