const signup = async () => {
    if (verifyFields() && verifyPassword()) {

        let datas = {
            name: `${in_firtname_signin.value.trim()} ${in_lastname_signin.value.trim()}`,
            email: in_email_signin.value.trim(),
            password: in_password_signin.value.trim(),
            age: +in_age_signin.value,
            gender: in_gender_signin
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
            let req = await fetch('http://localhost:3000/user/post', options);
            /** @type {{message: string, result: Array<any>}} */
            let res = await req.json();
            console.log(res);
            if (res.message === 'OK') {
                clearFields();
                showAlert('success', 'Ebaa!', 'Você foi cadastrado no banco de dados com sucesso!');
            }
        } catch (error) {
            console.error(error);
            showAlert('error', 'Ops...', 'Houve algum erro ao inserir.');
        }

    }

};

const verifyFields = () => {
    let fields = [
        in_firtname_signin.value,
        in_lastname_signin.value,
        in_email_signin.value,
        in_password_signin.value,
        in_ver_password_signin.value,
        in_age_signin.value,
        in_gender_signin.value
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

const verifyPassword = () => in_password_signin.value === in_ver_password_signin.value;

const clearFields = () => {
    let fields = [
        in_firtname_signin,
        in_lastname_signin,
        in_email_signin,
        in_password_signin,
        in_ver_password_signin,
        in_age_signin,

    ];
    for (let i = 0; i < fields.length; i++) {
        fields[i].value = '';
    }
    in_gender_signin.value = 0;
};

