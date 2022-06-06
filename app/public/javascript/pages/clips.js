
let user = checkSessionLogin();
(async () => {
    if (user === null || user === undefined) {
        window.location.href = '/signin';
    }
    try {
        let req = await fetch('http://localhost:3000/clip/get');
        /** @type {{message: string, result?: Array<any>, status: number}} */
        let res = await req.json();
        if (res.message === 'OK') {

            /** @type {HTMLElement} */
            let section = document.querySelector('#clips_all');

            res.result.reverse().forEach((clip, i) => {
                section.innerHTML += `
                <div class="shadow-sm flex flex-center flex-column align-center">
                 <i class="fas fa-star favorite"
                 onclick="tofavorite(${clip.id})" id='id${clip.id}' title="Favoritar" title="${clip.qtd}"><span>${clip.qtd}</span></i>
          <h3 class="font-action font-xlg font-medium mb">${clip.title}</h3>
          <iframe
            width="300"
            height="200"
            class="shadow-md hover-shadow-1 m-auto"
            src="${clip.url}"
            title="${clip.title}"
            frameborder="2"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        `;
            });
        }
    } catch (error) {
        console.error(error);
        showAlert('error', 'Ops...', 'Houve algum erro ao pegar comentarios.');
    }
})();
const tofavorite = async (clip) => {
    let span = document.querySelector(`#id${clip} span`);
    let count = +span.innerHTML + 1;
    span.innerHTML = count;
    let datas = {
        fkUser: user.id,
        fkClip: +clip,
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
        let req = await fetch('http://localhost:3000/clip/favorite', options);
        /** @type {{message: string, result?: Array<any>, status: number}} */
        let res = await req.json();
        if (res.message === 'OK') {
            showAlert('success', 'Ebba!!', 'Clipe favoritado');
        }
    } catch (error) {
        console.error(error);
        showAlert('error', 'Ops...', 'Houve algum erro ao favoritar clipe');
    }
};
