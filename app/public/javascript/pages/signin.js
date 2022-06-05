const signin = async () => {
    if (verifyFields()) {

        let datas = {
            email: in_email_signin.value.trim(),
            password: in_password_signin.value.trim(),
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
            let req = await fetch('http://localhost:3000/user/signin', options);
            /** @type {{message: string, result?: Array<any>, status: number}} */
            let res = await req.json();
            console.log(res);
            if (res.message === 'OK' && res.result.length > 0) {
                clearFields();
                showAlert('success', 'Ebaa!', 'Usuario encontrado!');
            } else {
                showAlert('warning', 'Ops...', 'E-mail ou senha  incorretos!');
            }
        } catch (error) {
            console.error(error);
            showAlert('error', 'Ops...', 'Houve algum erro ao realizar login.');
        }

    }

};

const verifyFields = () => {
    let fields = [
        in_email_signin.value,
        in_password_signin.value,
    ];
    let error = false;
    for (let i = 0; i < fields.length; i++) {
        let fieldIncorrect = fields[i].trim() == '' || fields[i].length <= 0;
        if (fieldIncorrect) {
            error = true;
            break;
        }
    }

    if (error) {
        showAlert('warning', 'Tome cuidado!', 'Preencha todos os campos corretamente.');
    }
    return !error;
};
const clearFields = () => {
    let fields = [
        in_email_signin.value,
        in_password_signin.value,
    ];
    for (let i = 0; i < fields.length; i++) {
        fields[i].value = '';
    }
};

