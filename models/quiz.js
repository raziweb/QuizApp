const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required for quiz']
    },
    instructions: {
        type: String,
        required: [true, 'Add instructions for the quiz']
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        //required: true
    }]
});

module.exports = mongoose.model('Quiz', quizSchema);