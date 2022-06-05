const model = require('../model/ClipModel');

/**
 * @param {number} [id=0]
 * @return {<{message: string,result: Promise<Array<object>>,status: number}>} 
 */
const index = async (id = 0) => {
    if (id > 0) {

    }
    let values = await model.getClips();
    return {
        message: 'OK',
        result: values,
        status: 200
    };
};
const set = async (title, url, fkUser) => {
    let titleCorrect = title !== undefined && title.trim().length > 0;
    let urlCorrect = url !== undefined && url.trim().length > 0;
    let fkUserCorrect = fkUser !== undefined && fkUser > 0;

    let allCorrect = titleCorrect && fkUserCorrect;

    if (allCorrect) {
        let values = await model.insertClip(title, url, fkUser);
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