const express = require("express");
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
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

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.send("Quiz App");
})

app.get('/quizzes', (req, res) => {
    res.render('quizzes/index');
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})