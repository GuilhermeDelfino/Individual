
let user = checkSessionLogin();
(() => {
    if (user === null || user === undefined) {
        window.location.href = '/signin';
    }
})();

const add_clip = async () => {
    let titleVar = comment.value.trim();
    let urlVar = comment.value.trim();

    let titleCorrect = titleVar !== '' && titleVar.length > 0;
    let urlCorrect = urlVar !== '' && urlVar.length > 0;

    if (titleCorrect && urlCorrect) {

        let datas = {
            title: titleVar,
            url: urlVar,
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
            let req = await fetch('http://localhost:3000/clip/post', options);
            /** @type {{message: string, result?: Array<any>, status: number}} */
            let res = await req.json();
            console.log(res);
            if (res.message === 'OK') {
                comment.value = '';
                showAlert('success', 'Ebba!!', 'Seu Clip foi adicionado!');
            }
        } catch (error) {
            console.error(error);
            showAlert('error', 'Ops...', 'Houve algum erro inserir clip');
        }

    }
};