const route = require('express').Router();
const controller = require('../controller/CommentController');


route.get('/get', async (request, response) => {
    let datas = await controller.index();

    response
        .json(datas)
        .status(datas.status);

});

route.post('/post', async (request, response) => {
    let comment = request.body.comment;
    let fkUser = request.body.fkUser;

    let datas = await controller.set(comment, fkUser);
    response
        .json(datas)
        .status(datas.status);
});

module.exports = route;
