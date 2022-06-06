const route = require('express').Router();
const controller = require('../controller/UserController');


route.get('/get', async (request, response) => {
    let datas = await controller.index();
    response
        .json(datas)
        .status(datas.status);

});
route.get('/get/metrics/:id', async (request, response) => {
    let datas = await controller.metrics(request.params.id);
    response
        .json(datas)
        .status(datas.status);
});
route.get('/get/metrics/', async (request, response) => {
    let datas = await controller.all_metrics();
    response
        .json(datas)
        .status(datas.status);
});
route.post('/signin', async (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    let datas = await controller.signin(email, password);
    response
        .json(datas)
        .status(datas.status);
});
route.post('/post', async (request, response) => {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    let age = request.body.age;

    let datas = await controller.set(name, email, password, age);
    response
        .json(datas)
        .status(datas.status);
});

module.exports = route;