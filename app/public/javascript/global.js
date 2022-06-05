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
            }, 2000);
        }, 2000);
    }, 200);
};