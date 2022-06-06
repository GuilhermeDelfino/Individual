const { getConnection } = require('../database/Connection');
const getClips = () => {
    try {
        return new Promise((resolve, reject) => {
            let stmt = `
                select _idClip id, titleClip title, count(_idClipFavorite) qtd, urlClip url from tbclip left join tbclipfavorite on fkClip = _idClip group by _idClip order by qtd;
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
 * @description insert a clip on database
 * @param {string} title
 * @param {string} url
 * @param {number} fkUser
 */
const tofavorite = (fkClip, fkUser) => {
    try {
        return new Promise((resolve, reject) => {
            let conn = getConnection();
            let stmt = `
            insert into tbclipfavorite (fkUser, fkClip) values (?, ?);
            `;
            let params = [fkUser, fkClip];
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
 * @description insert a clip on database
 * @param {string} title
 * @param {string} url
 * @param {number} fkUser
 */
const insertClip = (title, url, fkUser) => {
    try {
        return new Promise((resolve, reject) => {
            let conn = getConnection();
            let stmt = `
                insert into tbclip (titleClip, urlClip, fkUser) values (?, ?, ?);
            `;
            let params = [title, url, fkUser];
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
    tofavorite
};