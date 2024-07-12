export const preencherComZerosEsquerda = (numero: number, tamanho: number) => {
    let strNumero = "" + numero.toString();
    let numeroZeros = tamanho - strNumero.length;
    let resultado = "";
    for (let i = 0; i < numeroZeros; i++) {
        resultado += "0";
    }
    return resultado + strNumero;
}

export const removerFormatacao = (numero: string, tamanho: number) => {
    let strNumero = ("0" + numero).replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-", "").replaceAll(".", "").replaceAll("_", "").trim();
    let numeroZeros = tamanho - strNumero.length;
    let resultado = "";
    for (let i = 0; i < numeroZeros; i++) {
        resultado += "0";
    }
    return resultado + strNumero;
}

export const formatarCPF = (cpf: number) => {
    const cpfStr = preencherComZerosEsquerda(cpf, 11);
    return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatarCEP = (cep: number) => {
    const cepStr = preencherComZerosEsquerda(cep, 8);
    return cepStr.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const formatarTelefone = (telefone: number) => {
    if (telefone.toString().trim().length > 10) {
        const telStr = preencherComZerosEsquerda(telefone, 11);
        return telStr.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
        const telStr = preencherComZerosEsquerda(telefone, 10);
        return telStr.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
};

export const validarCPF = (cpf_paciente: number) => {
    let soma = 0;
    let resto;
    let cpf = cpf_paciente.toString().replace(/\D/g, "");

    if (cpf == '00000000000') return false;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
}
