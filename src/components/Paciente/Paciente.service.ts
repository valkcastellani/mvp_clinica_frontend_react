import Swal from "sweetalert2";
import { preencherComZerosEsquerda, removerFormatacao } from "../../util/utils";
import { PacienteState, PacienteTypes } from "./PacienteTypes";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { initialPacienteState } from "./PacienteReducers";
import { pacienteTypesChangeBairroAction, pacienteTypesChangeCidadeAction, pacienteTypesChangeEstadoAction, pacienteTypesChangeLogradouroAction } from "./PacienteActions";

const url = 'http://127.0.0.1:5000/paciente';

export const getListaPacientes = (): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        let listaPacientes: PacienteState[] = [];
        await fetch(url, {
            method: 'get'
        })
            .then((response) => response.json())
            .then((data) => {
                data.pacientes.forEach((paciente: PacienteState) =>
                    listaPacientes.push({
                        cpf: paciente.cpf,
                        nome: paciente.nome,
                        data_nascimento: paciente.data_nascimento,
                        sexo: paciente.sexo,
                        cep: paciente.cep,
                        logradouro: paciente.logradouro,
                        numero: paciente.numero,
                        complemento: paciente.complemento,
                        bairro: paciente.bairro,
                        cidade: paciente.cidade,
                        estado: paciente.estado,
                        telefone: paciente.telefone,
                        email: paciente.email,
                        data_insercao: paciente.data_insercao,
                        endereco: paciente.endereco
                    }))
            }).catch((error: any) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            });

        const data = {
            pacientes: listaPacientes
        }

        dispatch({ type: PacienteTypes.PACIENTE_GET_ALL_DATA, payload: data });

        return listaPacientes;
    }

export const getPaciente = (cpf: string): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        let pacienteState: PacienteState = initialPacienteState;
        await fetch(url + "/" + removerFormatacao(cpf, 11), {
            method: 'get'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                pacienteState.cpf = data.cpf;
                pacienteState.nome = data.nome;
                pacienteState.data_nascimento = data.data_nascimento;
                pacienteState.sexo = data.sexo;
                pacienteState.cep = data.cep;
                pacienteState.logradouro = data.logradouro;
                pacienteState.numero = data.numero;
                pacienteState.complemento = data.complemento;
                pacienteState.bairro = data.bairro;
                pacienteState.cidade = data.cidade;
                pacienteState.estado = data.estado;
                pacienteState.telefone = data.telefone;
                pacienteState.email = data.email;
                pacienteState.data_insercao = data.data_insercao;
                pacienteState.endereco = data.endereco;
            })
            .catch((error: any) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            });

        dispatch({ type: PacienteTypes.PACIENTE_GET_DATA, payload: pacienteState });
    }

export const deletePaciente = (cpf: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        await fetch(url + "/" + preencherComZerosEsquerda(cpf, 11), {
            method: 'delete',
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            }).catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            });

        dispatch(getListaPacientes());
    }

export const postPaciente = (paciente: PacienteState): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        const formData = new FormData();

        formData.append('cpf', "" + removerFormatacao(paciente.cpf, 11));
        formData.append('nome', paciente.nome);
        formData.append('data_nascimento', paciente.data_nascimento);
        formData.append('sexo', paciente.sexo);
        formData.append('cep', "" + removerFormatacao(paciente.cep, 8));
        formData.append('numero', paciente.numero);
        formData.append('complemento', paciente.complemento);
        formData.append('telefone', "" + removerFormatacao(paciente.telefone, 11));
        formData.append('email', paciente.email);

        await fetch(url + "/" + removerFormatacao(paciente.cpf, 11), {
            method: 'post',
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            }).catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            });

        dispatch(getListaPacientes());
    }

export const putPaciente = (paciente: PacienteState): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        const formData = new FormData();

        formData.append('cpf', removerFormatacao(paciente.cpf, 11));
        formData.append('nome', paciente.nome);
        formData.append('data_nascimento', paciente.data_nascimento);
        formData.append('sexo', paciente.sexo);
        formData.append('cep', removerFormatacao(paciente.cep, 8));
        formData.append('numero', paciente.numero);
        formData.append('complemento', paciente.complemento);
        formData.append('telefone', removerFormatacao(paciente.telefone, 11));
        formData.append('email', paciente.email);

        fetch(url + "/" + removerFormatacao(paciente.cpf, 11), {
            method: 'post',
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            }).catch((error) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            });

        dispatch(getListaPacientes());
    }


export const getViaCep = (cep: number): ThunkAction<void, RootState, unknown, AnyAction> =>
    async dispatch => {
        let url = 'https://viacep.com.br/ws/' + preencherComZerosEsquerda(cep, 8) + '/json/';
        await fetch(url, {
            method: 'get'
        })
            .then((response) => response.json())
            .then((data) => {
                dispatch(pacienteTypesChangeLogradouroAction(data.logradouro));
                dispatch(pacienteTypesChangeBairroAction(data.bairro));
                dispatch(pacienteTypesChangeCidadeAction(data.locallidade));
                dispatch(pacienteTypesChangeEstadoAction(data.uf));
            });
    }