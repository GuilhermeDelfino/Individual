const model = require('../model/UserModel');

/**
 * @param {number} [id=0]
 * @return {<{message: string,result: Promise<Array<object>>,status: number}>} 
 */
const index = async () => {
    let values = await model.getAllUsers();
    return {
        message: 'OK',
        result: values,
        status: 200
    };
};
const metrics = async (idUser) => {
    let values = await model.getMetricsUser(idUser);
    return {
        message: 'OK',
        result: values,
        status: 200
    };
};
const all_metrics = async () => {
    let values = await model.getMetrics();
    return {
        message: 'OK',
        result: values,
        status: 200
    };
};
/**
 * @param {string} email
 * @param {string} password
 * @return {<{message: string,result?: Promise<Array<object>>,status: number}>} 
 */
const signin = async (email, password) => {

    let emailCorrect = email !== undefined && email.trim().length > 0;
    let passwordCorrect = password !== undefined && password.trim().length > 0;

    let allCorrect = emailCorrect && passwordCorrect;

    if (allCorrect) {
        let values = await model.getUserByLogin(email, password);
        return {
            message: 'OK',
            result: values,
            status: 200
        };
    } else {
        return { message: 'Verify your params', status: 404 };
    }
};
/**
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {age} age
 * @return {<{message: string,result?: Promise<Array<object>>,status: number}>} 
 */
const set = async (name, email, password, age, gender = 'M', remember = 'Y') => {
    let nameCorrect = name !== undefined && name.trim().length > 0;
    let emailCorrect = email !== undefined && email.trim().length > 0;
    let passwordCorrect = password !== undefined && password.trim().length > 0;
    let ageCorrect = age !== undefined && age > 0;
    let genderCorrect = gender !== undefined && gender.trim().length > 0;
    // let rememberCorrect = remember !== undefined && remember.trim().length > 0;

    let allCorrect = nameCorrect &&
        emailCorrect &&
        passwordCorrect &&
        ageCorrect &&
        genderCorrect
        ;

    if (allCorrect) {
        let values = await model.insertUser(name, email, password, age, gender);
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
    signin,
    metrics,
    all_metrics,
};