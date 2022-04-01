export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
}

const validadores = {
    dataNascimento: input => validaNascimento(input)
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

inputNascimento.addEventListener('blur', () => {
    validaNascimento(inputNascimento);
})