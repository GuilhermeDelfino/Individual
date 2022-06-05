
(() => {
    let user = checkSessionLogin();
    if (user === null || user === undefined) {
        window.location.href = '/';
    }

    document.querySelector('#name').value = user.name.split(' ')[0];
    lastname.value = user.name.split(' ')[1];
    email.value = user.email;
    age.value = user.age;
    gender.value = 'Masculino';

})();

