import moment from "moment";
import { PacienteState, PacienteTypes } from "./PacienteTypes";
import { PayloadAction } from "@reduxjs/toolkit";

export const initialPacienteState: PacienteState = {
    cpf: "",
    nome: "",
    data_nascimento: moment(Date.now()).format("YYYY-MM-DD"),
    sexo: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefone: "",
    email: "",
    data_insercao: moment(Date.now()).toString(),
    endereco: ""
}

export const PacienteReducers = (state: PacienteState = initialPacienteState, action: PayloadAction<string[]>) => {
    switch (action.type) {
        case PacienteTypes.PACIENTE_GET_DATA:
            return { ...action.payload };

        case PacienteTypes.PACIENTE_CHANGE_CPF:
            return { ...state, cpf: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_DATA_NASCIMENTO:
            return { ...state, data_nascimento: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_NOME:
            return { ...state, nome: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_SEXO:
            return { ...state, sexo: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_CEP:
            return { ...state, cep: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_LOGRADOURO:
            return { ...state, logradouro: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_NUMERO:
            return { ...state, numero: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_COMPLEMENTO:
            return { ...state, complemento: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_BAIRRO:
            return { ...state, bairro: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_CIDADE:
            return { ...state, cidade: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_ESTADO:
            return { ...state, estado: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_TELEFONE:
            return { ...state, telefone: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_EMAIL:
            return { ...state, email: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_DATA_INSERCAO:
            return { ...state, data_insercao: action.payload };

        case PacienteTypes.PACIENTE_CHANGE_ENDERECO:
            return { ...state, endereco: action.payload };

        default:
            return state;
    }
}