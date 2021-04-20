const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        required: [true, 'Question is required']
    },
    option: {
        type: [String],
        required: [true, 'Set 4 options for the question'],
        validate: [arrayLimit, '{PATH} exceeds the limit of 4']
    },
    answer: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: [true, 'Please provide an answer']
    }
});

function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = mongoose.model('Question', questionSchema);