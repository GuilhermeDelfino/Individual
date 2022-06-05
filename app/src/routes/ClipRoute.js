const route = require('express').Router();
const controller = require('../controller/ClipController');


route.get('/get', async (request, response) => {
    let datas = await controller.index();

    response
        .json(datas)
        .status(datas.status);

});

route.post('/post', async (request, response) => {
    let title = request.body.title;
    let url = request.body.url;
    let fkUser = request.body.fkUser;

    let datas = await controller.set(title, url, fkUser);
    response
        .json(datas)
        .status(datas.status);
});

module.exports = route;
