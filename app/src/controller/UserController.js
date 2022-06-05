const model = require('../model/UserModel');

/**
 * @param {number} [id=0]
 * @return {<{message: string,result: Promise<Array<object>>,status: number}>} 
 */
const index = async (id = 0) => {
    if (id > 0) {

    }
    let values = await model.getAllUsers();
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
const set = async (name, email, password, age) => {
    let nameCorrect = name !== undefined && name.trim().length > 0;
    let emailCorrect = email !== undefined && email.trim().length > 0;
    let passwordCorrect = password !== undefined && password.trim().length > 0;
    let ageCorrect = age !== undefined && age > 0;

    let allCorrect = nameCorrect &&
        emailCorrect &&
        passwordCorrect &&
        ageCorrect;

    if (allCorrect) {
        let values = await model.insertUser(name, email, password, age);
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
    signin
};