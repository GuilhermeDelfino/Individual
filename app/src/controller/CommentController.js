const model = require('../model/CommentModel');

/**
 * @param {number} [id=0]
 * @return {<{message: string,result: Promise<Array<object>>,status: number}>} 
 */
const index = async (id = 0) => {
    if (id > 0) {

    }
    let values = await model.getLastComment();
    return {
        message: 'OK',
        result: values,
        status: 200
    };
};
const set = async (comment, fkUser) => {
    let commentCorrect = comment !== undefined && comment.trim().length > 0;
    let fkUserCorrect = fkUser !== undefined && fkUser > 0;

    let allCorrect = commentCorrect && fkUserCorrect;

    if (allCorrect) {
        let values = await model.insertComment(comment, fkUser);
        return {
            message: 'OK',
            result: values,
            status: 200
        };
    } else {
        return { message: 'Verify your params', status: 404 };
    }
};


module.exports = {
    index,
    set,
};