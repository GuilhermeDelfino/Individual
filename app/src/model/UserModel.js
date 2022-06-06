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
const getMetricsUser = (idUser) => {
    try {
        return new Promise((resolve, reject) => {
            let stmt = `select
            (select count(_idUser) from tbuser join tbcomment on _idUser = fkUser where _idUser = ? limit 1) qtdComments,
            (select count(_idUser) from tbuser join tbclip on _idUser = fkUser where _idUser = ? limit 1) qtdClip,
            (select count(_idUser) from tbuser join tbclipfavorite on _idUser = fkUser where _idUser = ? limit 1) qtdFavorite;
            `;
            let conn = getConnection();
            conn.execute(stmt, [idUser, idUser, idUser], (err, result) => {
                if (err) reject(err.message);
                resolve(result);
                return result;
            });
        });
    } catch (error) {
        throw error;
    }
};
const getMetrics = () => {
    try {
        return new Promise((resolve, reject) => {
            let stmt = `select 
            (select count(_idUser) from tbuser) qtdUsers,
            (select truncate(avg(ageUser), 0)  from tbuser) avgAge;
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
 * @param {string} gender
 * @param {string} remember
 */
const insertUser = (name, email, password, age, gender = 'M', remember = 'Y') => {
    try {
        return new Promise((resolve, reject) => {
            let conn = getConnection();
            let stmt = `
                insert into tbuser (nameUser, emailUser, passwordUser, ageUser, genderUser, rememberUser) values (?,?, aes_encrypt(?, ?), ?, ?, ?);
            `;

            let params = [name, email, password, process.env.hashKey, age, gender, remember];

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
                select _idUser as id, nameUser as name, emailUser as email, ageUser as age, genderUser as gender from tbuser where emailUser = ? and passwordUser =  aes_encrypt(?, ?);
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
    getUserByLogin,
    getMetricsUser,
    getMetrics
};