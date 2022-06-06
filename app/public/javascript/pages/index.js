(async () => {
  try {
    let req = await fetch('http://localhost:3000/comment/get');
    /** @type {{message: string, result?: Array<any>, status: number}} */
    let res = await req.json();
    console.log(res);
    if (res.message === 'OK') {

      /** @type {HTMLElement} */
      let section = document.querySelector('#comments');

      res.result.reverse().forEach((comm, i) => {
        console.log(comm.comment);
        if (i == 2) {
          section.innerHTML +=
            `
                        <div class="comment comment-main flex-center flex-column flex">
                        <h4 class="title-1 font-bold underline comment-title main">
                        ${comm.name}
                        </h4>
                        <div class="comment-body main font-xmd">
                          “${comm.comment}” - ${comm.year}
                        </div>
                      </div>
                    `;
        } else {
          section.innerHTML +=
            `
                        <div
                        class="comment text-center flex-center flex align-center flex-column"
                      >
                        <h4 class="font-lg font-bold underline comment-title">
                          ${comm.name}
                        </h4>
                        <div class="comment-body font-sm">
                          “${comm.comment}” -
                          ${comm.year}
                        </div>
                      </div>
                    `;
        }
      });
    }
  } catch (error) {
    console.error(error);
    showAlert('error', 'Ops...', 'Houve algum erro ao pegar comentarios.');
  }

  try {
    let req = await fetch('http://localhost:3000/comment/get');
    /** @type {{message: string, result?: Array<any>, status: number}} */
    let res = await req.json();
  } catch (error) {
    console.error(error);
    showAlert('error', 'Ops...', 'Houve algum erro ao pegar métricas.');
  }

  fetch(`http://localhost:3000/user/get/metrics/`)
    .then(val => val.json())
    .then(json => {
      json = json.result;
      qtdUsers.innerHTML = `${json[0].qtdUsers} usuários cadastrados!`;
      avgUsers.innerHTML = `Média das idades é de ${json[0].avgAge}`;
    })
    .catch(err => {
      console.error(err);
    });
})();