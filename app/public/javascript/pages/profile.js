
(() => {
    let user = checkSessionLogin();
    if (user === null || user === undefined) {
        window.location.href = '/signin';
    }

    document.querySelector('#name').value = user.name.split(' ')[0];
    lastname.value = user.name.split(' ')[1];
    email.value = user.email;
    age.value = user.age;
    gender.value = 'Masculino';

    fetch(`http://localhost:3000/user/get/metrics/`)
        .then(val => val.json())
        .then(json => {
            json = json.result;
            comments.innerHTML = json[0].qtdComments;
            added_clip.innerHTML = json[0].qtdClip;
            favorited_clips.innerHTML = json[0].qtdFavorite;
        })
        .catch(err => {
            console.error(err);
        });

})();

