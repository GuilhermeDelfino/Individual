

let user = checkSessionLogin();
(() => {
    if (user === null || user === undefined) {
        window.location.href = '/signin';
    }
})();

const add_comment = async () => {
    let commentVar = comment.value.trim();
    if (commentVar !== '' && commentVar.length > 0) {

        let datas = {
            comment: commentVar,
            fkUser: user.id,
        };
        /** @type {RequestInit} */
        let options = {
            cache: 'default',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(datas)
        };

        try {
            let req = await fetch('http://localhost:3000/comment/post', options);
            /** @type {{message: string, result?: Array<any>, status: number}} */
            let res = await req.json();
            console.log(res);
            if (res.message === 'OK') {
                comment.value = '';
                showAlert('success', 'Ebba!!', 'Seu comentário foi inserido!');
            }
        } catch (error) {
            console.error(error);
            showAlert('error', 'Ops...', 'Houve algum erro ao realizar login.');
        }

    }
};