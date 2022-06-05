const { getConnection } = require('../database/Connection');
const getAllUsers = () => {
    try {
        return new Promise((resolve, reject) => {
            let stmt = `
                select _idUser as id, nameUser as name, emailUser as email, ageUser as age from tbuser
            `;
            let conn = getConnection();
            conn.execute(stmt, null, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
                return result;
            });
        });
    } catch (error) {
        throw error;
    }
};

/**
 * @description insert a user on database
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {int} age
 */
const insertUser = (name, email, password, age) => {
    try {
        return new Promise((resolve, reject) => {
            let conn = getConnection();
            let stmt = `
                insert into tbuser (nameUser, emailUser, passwordUser, ageUser) values (?,?, aes_encrypt(?, ?), ?);
            `;

            let params = [name, email, password, process.env.hashKey, age];

            conn.execute(stmt, params, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
                return result;
            });
        });
    } catch (error) {
        throw error;
    }
};
/**
 * @param {string} email
 * @param {string} password
 */
const getUserByLogin = (email, password) => {
    try {
        return new Promise((resolve, reject) => {
            let conn = getConnection();
            let stmt = `
                select _idUser as id, nameUser as name, emailUser as email, ageUser as age from tbuser where emailUser = ? and passwordUser =  aes_encrypt(?, ?);
            `;

            let params = [email, password, process.env.hashKey];
            conn.execute(stmt, params, (err, result) => {
                if (err) reject(err.message);
                resolve(result);
                return result;
            });
        });
    } catch (error) {
        throw error;
    }

};
module.exports = {
    getAllUsers,
    insertUser,
    getUserByLogin
};