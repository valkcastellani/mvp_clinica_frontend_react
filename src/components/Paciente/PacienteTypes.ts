import moment from "moment"

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

export interface ISexo {
    label: string
    value: string
}

export interface PacienteDialogProps {
    paciente: IPacienteComEndereco
    readonly: boolean
    visible: boolean
    setVisible: (visible: boolean) => void
}

export const PacienteEmBranco = {
    cpf: 0,
    nome: "",
    data_nascimento: moment(new Date()).format("DD/MM/YYYY"),
    sexo: "",
    cep: 0,
    numero: "",
    complemento: "",
    telefone: 0,
    email: "",
    data_insercao: moment(new Date()).format("DD/MM/YYYY"),
    endereco: ""
}

export const sexOptions: ISexo[] = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Não binário', value: 'N' },
    { label: 'Prefiro não responder', value: 'P' },
    { label: 'Outro', value: 'O' }
];
