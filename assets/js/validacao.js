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
    }
}

const validadores = {
    dataNascimento: input => validaNascimento(input)
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

    console.log("alo galera");

    let mensagem = '';

    if(dataMais18 > dataAtual){
        mensagem = 'Você deve ser maior de 18 anos para se cadastrar!'
    }

    input.setCustomValidity(mensagem);
}
