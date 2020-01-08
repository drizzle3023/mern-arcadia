const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userPhoneNumber: {
        type: String
    },
    userPassword: {
        type: String
    },
    entity: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "entity"
    },
});

module.exports = mongoose.model('user', userSchema);
