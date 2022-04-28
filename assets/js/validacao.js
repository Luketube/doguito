export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemErro(tipoDeInput, input);
    }

}

const tiposErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagemErro = {
    nome: {
        valueMissing: 'O campo não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo não pode estar vazio.',
        typeMismatch: 'O email digitado é inválido.'
    },
    senha: {
        valueMissing: 'O campo não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, sendo pelo menos uma letra maiúscula e minúscula e um número.'
    },
    dataNascimento: {
        valueMissing: 'O campo não pode estar vazio.',
        customError: 'Você deve ser maior de 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing:'O campo não pode estar vazio.',
        customError:'CPF digitado não é valido.'
    }
}

const validadores = {
    dataNascimento: input => validaNascimento(input),
    cpf: input => validaCPF(input)
}

function mostraMensagemErro(tipoDeInput, input){
    let mensagem = '';

    tiposErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagemErro[tipoDeInput][erro];
        }
    })

    return mensagem;
}

function validaNascimento(input){
    const dataCadastrada = new Date(input.value);
    const dataMais18 = new Date(dataCadastrada.getUTCFullYear() + 18, dataCadastrada.getUTCMonth(), dataCadastrada.getUTCDate());
    const dataAtual = new Date();

    let mensagem = '';

    if(dataMais18 > dataAtual){
        mensagem = 'Você deve ser maior de 18 anos para se cadastrar!'
    }

    input.setCustomValidity(mensagem);
}

function validaCPF (input){
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';

    if(!validaCpfRepetido(cpfFormatado)){
        mensagem = 'CPF digitado não é valido.'
    };

    input.setCustomValidity(mensagem);
}

function validaCpfRepetido(cpf){
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];
    let cpfValido = true;

    if(cpf.length != 11){
        cpfValido = false;
    }

    valoresRepetidos.forEach(valor => {
        if(valor == cpf){
            cpfValido = false;
        }
    })

    return cpfValido

}
