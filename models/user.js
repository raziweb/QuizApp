const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isTeacher: {
        type: Boolean,
        required: true,
    },
    result: {
        type: [{
            quiz: String,
            score: Number
        }]
    }
})

userSchema.plugin(passportLocalMongoose); //adds username and password to the schema, ensures username are unique, hashes the passwords

const User = mongoose.model('User', userSchema);
module.exports = User;