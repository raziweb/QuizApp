const express = require("express");
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Quiz = require('./models/quiz');
const Question = require('./models/question')

//Connecting database
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

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));

//function to compute marks secured in a given quiz
const computeScore = (Answer, quiz) => {
    let score = 0;
    for (let i = 0; i < quiz.questions.length; i++){
        //console.log(quiz.questions[i].answer);
        if (Answer[`ques${i}`]) {
            if (quiz.questions[i].answer == Answer[`ques${i}`])
                score++;
        }
    }
    return score;
}

//Home Page
app.get('/', (req, res) => {
    res.send("Quiz App");
})

//All available quizzes
app.get('/quizzes', async (req, res) => {
    const quizzes = await Quiz.find({});
    res.render('quizzes/index', { quizzes });
})

//form to create new quiz
app.get('/quizzes/new', (req, res) => {
    res.render('quizzes/new');
})

//Saving quiz
app.post('/quizzes', async (req, res) => {
    //console.log(req.body);
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.redirect(`/quizzes/${quiz._id}/questions/new`);
})

//form to add questions to the quiz
app.get('/quizzes/:id/questions/new', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    res.render('questions/new', {quiz});
});

//saving questions in database and adding them to particular quiz
app.post('/quizzes/:id/questions', async (req, res) => {
    //console.log(req.body);
    const quiz = await Quiz.findById(req.params.id);
    const question = new Question(req.body);
    await question.save()
        .then(data => console.log(data));
    quiz.questions.push(question);
    await quiz.save();
    res.redirect(`/quizzes/${quiz._id}/questions/new`);
})

//instruction page of a particular quiz
app.get('/quizzes/:id', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id).populate({
        path: 'questions'
    });
    //console.log(quiz.questions[0].option[2]);
    res.render('quizzes/show', { quiz });
})

//Attempt page of a particular quiz with all its questions
app.get('/quizzes/:id/questions', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id).populate({
        path: 'questions'
    });
    res.render('quizzes/questions', { quiz });
})

//to compute the score of a quiz after attempting and rendering the score page
app.post('/quizzes/:id/questions/score', async (req, res) => {
    const quiz = await Quiz.findById(req.params.id).populate({
        path: 'questions'
    });
    const { Answer } = req.body;
    //console.log(Answer);
    const score = (Answer)?computeScore(Answer, quiz):0;
    //console.log(score);
    //console.log(`You scored ${score}/${quiz.questions.length}`);
    res.render('quizzes/score', { quiz, score });
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})