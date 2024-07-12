export const PacienteTypes = {
    PACIENTE_GET_ALL_DATA: "PACIENTE_GET_ALL_DATA",
    PACIENTE_GET_DATA: "PACIENTE_GET_DATA",
    PACIENTE_CHANGE_CPF: "PACIENTE_CHANGE_CPF",
    PACIENTE_CHANGE_NOME: "PACIENTE_CHANGE_NOME",
    PACIENTE_CHANGE_DATA_NASCIMENTO: "PACIENTE_CHANGE_DATA_NASCIMENTO",
    PACIENTE_CHANGE_SEXO: "PACIENTE_CHANGE_SEXO",
    PACIENTE_CHANGE_CEP: "PACIENTE_CHANGE_CEP",
    PACIENTE_CHANGE_LOGRADOURO: "PACIENTE_CHANGE_LOGRADOURO",
    PACIENTE_CHANGE_NUMERO: "PACIENTE_CHANGE_NUMERO",
    PACIENTE_CHANGE_COMPLEMENTO: "PACIENTE_CHANGE_COMPLEMENTO",
    PACIENTE_CHANGE_BAIRRO: "PACIENTE_CHANGE_BAIRRO",
    PACIENTE_CHANGE_CIDADE: "PACIENTE_CHANGE_CIDADE",
    PACIENTE_CHANGE_ESTADO: "PACIENTE_CHANGE_ESTADO",
    PACIENTE_CHANGE_TELEFONE: "PACIENTE_CHANGE_TELEFONE",
    PACIENTE_CHANGE_EMAIL: "PACIENTE_CHANGE_EMAIL",
    PACIENTE_CHANGE_DATA_INSERCAO: "PACIENTE_CHANGE_DATA_INSERCAO",
    PACIENTE_CHANGE_ENDERECO: "PACIENTE_CHANGE_ENDERECO"
}

export interface IPaciente {
    cpf: string
    nome: string
    data_nascimento: string
    sexo: string
    cep: string
    numero: string
    complemento: string
    telefone: number
    email: string
    data_insercao: string
}

export interface PacienteState {
    cpf: string
    nome: string
    data_nascimento: string
    sexo: string
    cep: string
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    telefone: string
    email: string
    data_insercao: string
    endereco: string
}

export interface PacienteAllState {
    pacientes: PacienteState[]
}

export interface ISexo {
    label: string
    value: string
}

export interface PacienteDialogProps {
    paciente: PacienteState
    readonly: boolean
    visible: boolean
    setVisible: (visible: boolean) => void
}

export const sexOptions: ISexo[] = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Não binário', value: 'N' },
    { label: 'Prefiro não responder', value: 'P' },
    { label: 'Outro', value: 'O' }
];