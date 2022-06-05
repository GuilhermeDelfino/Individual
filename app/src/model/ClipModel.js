const { getConnection } = require('../database/Connection');
const getClips = () => {
    try {
        return new Promise((resolve, reject) => {
            let stmt = `
                select _idComment as id, comment, fkUser as idUser, nameUser as name, YEAR(tbcomment.createdAt) as year from tbcomment join tbuser on fkUser = _idUser order by tbcomment.createdAt desc limit 5;
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
 * @description insert a comment on database
 * @param {string} title
 * @param {number} fkUser
 */
const insertClip = (title, url, fkUser) => {
    try {
        return new Promise((resolve, reject) => {
            let conn = getConnection();
            let stmt = `
                insert into tbclip (titleClip, urlClip) values (?, ?);
            `;
            let params = [comment, fkUser];
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
    getClips,
    insertClip,
};