/**
 * @param {string} type 'success' or 'error' or 'warning'
 * @param {string} title
 * @param {string} body
 */
const showAlert = (type, title, body) => {
    document.body.innerHTML +=
        `
        <div class='alert ${type} shadow-blur-2 flex flex-column flex-center'>
            <h4 class='font-action font-lg font-bold'>${title}</h4>
            <p class='font-md font-medium'>${body}</p>
        </div>
    `;
    setTimeout(() => {
        document.body.querySelector('.alert').classList.add('show');

        setTimeout(() => {
            document.body.querySelector('.alert').classList.remove('show');

            setTimeout(() => {
                document.body.querySelector('.alert').remove();
            }, 1000);
        }, 3500);
    }, 200);
};

const checkSessionLogin = () => {
    let user = sessionStorage.getItem('user');

    if (user !== undefined) {
        return JSON.parse(user);
    }
    return null;
};
(() => {
    let user = checkSessionLogin();
    /** @type {HTMLElement} */
    let header = document.querySelector('header.header');
    let dataPermission = [];
    if (user !== null) {
        sessionStorage.setItem('permission', 'auth');
        dataPermission = header.querySelectorAll(`[data-permisson='ghost']`);

        header.querySelector(`a[href='/profile']`).innerHTML =
            `
            ${user.name.split(' ').length > 0 ? user.name.split(' ')[0] : user.name}
        `;
    } else {
        sessionStorage.setItem('permission', 'ghost');
        dataPermission = header.querySelectorAll(`[data-permisson='auth']`);
    }
    dataPermission.forEach(el => el.classList.add('d-none'));
})();

const logout = () => {
    if (checkSessionLogin() !== null) {
        sessionStorage.removeItem('user');
        window.location.reload();
    }
};