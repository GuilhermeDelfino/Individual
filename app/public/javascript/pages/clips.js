
let user = checkSessionLogin();
(() => {
    if (user === null || user === undefined) {
        window.location.href = '/signin';
    }
})();