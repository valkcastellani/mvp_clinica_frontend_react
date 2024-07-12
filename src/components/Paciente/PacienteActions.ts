import { PacienteTypes } from "./PacienteTypes"

export const pacienteTypesGetDataAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_GET_DATA,
    payload: data
})

export const pacienteTypesChangeCpfAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_CPF,
    payload: data
})

export const pacienteTypesChangeDataNascimentoAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_DATA_NASCIMENTO,
    payload: data
})

export const pacienteTypesChangeNomeAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_NOME,
    payload: data
})

export const pacienteTypesChangeSexoAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_SEXO,
    payload: data
})

export const pacienteTypesChangeCepAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_CEP,
    payload: data
})

export const pacienteTypesChangeLogradouroAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_LOGRADOURO,
    payload: data
})

export const pacienteTypesChangeNumeroAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_NUMERO,
    payload: data
})

export const pacienteTypesChangeComplementoAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_COMPLEMENTO,
    payload: data
})

export const pacienteTypesChangeBairroAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_BAIRRO,
    payload: data
})

export const pacienteTypesChangeCidadeAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_CIDADE,
    payload: data
})

export const pacienteTypesChangeEstadoAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_ESTADO,
    payload: data
})

export const pacienteTypesChangeTelefoneAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_TELEFONE,
    payload: data
})

export const pacienteTypesChangeEmailAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_EMAIL,
    payload: data
})

export const pacienteTypesChangeDataInsercaoAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_DATA_INSERCAO,
    payload: data
})

export const pacienteTypesChangeDataEnderecoAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_CHANGE_ENDERECO,
    payload: data
})