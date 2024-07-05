export interface IPaciente {
    cpf: number
    nome: string
    data_nascimento: string
    sexo: string
    cep: number
    numero: string
    complemento: string
    telefone: number
    email: string
    data_insercao: string
}

export interface IPacienteComEndereco {
    cpf: number
    nome: string
    data_nascimento: string
    sexo: string
    cep: number
    numero: string
    complemento: string
    telefone: number
    email: string
    data_insercao: string
    endereco: string
}