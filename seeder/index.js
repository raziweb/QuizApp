const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quiz-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const Question = require('../models/question');
const Quiz = require('../models/quiz');
const User = require('../models/user');


//--------------- Creating example questions -------------//

// const ques1 = new Question({
//     question: 'What is 2+2 ?',
//     option: ['2', '4', '6', '8'],
//     answer: 1
// });
// ques1.save()
//     .then(res => {
//         console.log("Added Successfully");
//         console.log(res);
//     })

// const ques2 = new Question({
//     question: 'What is 2*2 ?',
//     option: ['2', '4', '6', '8'],
//     answer: 2
// });
// ques2.save()
//     .then(res => {
//         console.log("Added Successfully");
//         console.log(res);
//     })

// const ques3 = new Question({
//     question: 'What is 2! ?',
//     option: ['2', '4', '6', '8'],
//     answer: 1
// });
// ques3.save()
//     .then(res => {
//         console.log("Added Successfully");
//         console.log(res);
//     })

// const ques4 = new Question({
//     question: 'What is 2^2 ?',
//     option: ['2', '4', '6', '8'],
//     answer: 2
// });
// ques4.save()
//     .then(res => {
//         console.log("Added Successfully");
//         console.log(res);
//     })

// ------------ Creating a quiz using those example questions  -----------//

// const quiz1 = new Quiz({
//     name: 'Maths 101',
//     instructions: 'Do not cheat',
//     questions: [
//         "607ef1b4c1ee4e44186f1dc9",
//         "607ef1b4c1ee4e44186f1dca",
//         "607ef1b4c1ee4e44186f1dcb",
//         "607ef1b4c1ee4e44186f1dcc"
//     ] //ObjectId of previously created question
// });

// quiz1.save()
//     .then(res => {
//         console.log("Added Successfully");
//         console.log(res);
//     })
//     .catch(err =>{
//     console.log("Something went wrong");
//     console.log(err);
// })

// const user = new User({
//     name: 'Razi Shahid',
//     email: 'razi@xyz.com',
//     isTeacher: 0,
//     username: 'razi456',
//     score: [{ quiz: 'IWT Lab', marks: 4 }, { quiz: 'SE', marks: 5 }]
// });
// const newUser = await User.register(user, 'chicken');
// console.log(newUser);
    