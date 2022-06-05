const route = require('express').Router();
//? DEFINE ROUTES OF SCREEN

route.get('/', (req, res) => {
    res.render("index");
});
route.get('/about', (req, res) => {
    res.render("about");
});
route.get('/why', (req, res) => {
    res.render("why");
});
route.get('/signin', (req, res) => {
    res.render("signin");
});
route.get('/signup', (req, res) => {
    res.render("signup");
});
route.get('/clips', (req, res) => {
    res.render("clips");
});
route.get('/add/clips', (req, res) => {
    res.render("add-clip");
});
route.get('/add/comment', (req, res) => {
    res.render("add-comment");
});
route.get('/profile', (req, res) => {
    res.render("profile");
});

module.exports = route;