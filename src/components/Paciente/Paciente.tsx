import React from 'react';
import moment from 'moment';
import { ptBR } from 'date-fns/locale';

import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { addLocale } from 'primereact/api';
import { InputMask } from 'primereact/inputmask';

import { deletePaciente, getListaPacientes, getPaciente, getViaCep, postPaciente, putPaciente } from './Paciente.service';
import { PacienteAllState, PacienteState, sexOptions } from './PacienteTypes';
import { formatarCPF, formatarTelefone, removerFormatacao, validarCPF } from '../../util/utils';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './Paciente.css';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { pacienteTypesChangeBairroAction, pacienteTypesChangeCepAction, pacienteTypesChangeCidadeAction, pacienteTypesChangeComplementoAction, pacienteTypesChangeCpfAction, pacienteTypesChangeDataNascimentoAction, pacienteTypesChangeEmailAction, pacienteTypesChangeEstadoAction, pacienteTypesChangeLogradouroAction, pacienteTypesChangeNomeAction, pacienteTypesChangeNumeroAction, pacienteTypesChangeSexoAction, pacienteTypesChangeTelefoneAction, pacienteTypesGetDataAction } from './PacienteActions';
import { AppDispatch } from '../../app/store';
import { initialPacienteState } from './PacienteReducers';

const Paciente = () => {
    const paciente: PacienteState = useSelector((state: any) => state.paciente);
    const pacientes: PacienteAllState = useSelector((state: any) => state.pacientes);
    const dispatch: AppDispatch = useDispatch();
    const dt = React.useRef<DataTable<PacienteState[]>>(null);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [readonly, setReadonly] = React.useState<boolean>(false);
    const [inclusao, setInclusao] = React.useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = React.useState<string>("");

    React.useEffect(() => {
        dispatch(getListaPacientes());
    }, []);

    React.useEffect(() => {
        let cep1: string = "" + paciente.cep;
        let cep2: string = "" + Number(removerFormatacao(cep1, 8));
        if (cep2.trim().length === 8) {
            dispatch(getViaCep(Number(cep2)));
        }
    }, [paciente.cep]);


    const renderizarCPF = (rowData: PacienteState) => formatarCPF(Number(rowData.cpf));
    const renderizarData = (rowData: PacienteState) => new Date(rowData.data_nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const renderizarTelefone = (rowData: PacienteState) => formatarTelefone(Number(rowData.telefone));

    const adicionarPaciente = () => {
        dispatch(pacienteTypesGetDataAction(initialPacienteState));
        setReadonly(false);
        setInclusao(true);
        setVisible(true);
    }

    const consultarPaciente = (cpf: string) => {
        dispatch(getPaciente(removerFormatacao(cpf, 11)));
        setReadonly(true);
        setInclusao(false);
        setVisible(true);
    }

    const alterarPaciente = (cpf: string) => {
        dispatch(getPaciente(removerFormatacao(cpf, 11)));
        setReadonly(false);
        setInclusao(false);
        setVisible(true);
    }

    const excluirPaciente = (cpf: string, nome: string) => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Você vai excluir o paciente " + nome + " portador do CPF " + cpf + "!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, pode excluir!",
            cancelButtonText: "Cancelar"
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                dispatch(deletePaciente(Number(removerFormatacao(cpf, 11))));
            }
        });
    }

    const salvarNovoPaciente = () => {
        if (validarCPF(Number(removerFormatacao(paciente.cpf, 11)))) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "CPF Inválido!",
                showConfirmButton: false,
                timer: 1000
            });
        } else if (!paciente.nome) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "O nome do paciente está em branco!",
                showConfirmButton: false,
                timer: 1000
            });
        } else if (!paciente.data_nascimento) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "A data de nascimento do paciente está em branco!",
                showConfirmButton: false,
                timer: 1000
            });
        } else {
            setVisible(false);
            Swal.fire({
                title: "Tem certeza?",
                text: "Você vai incluir o paciente " + paciente.nome + " portador do CPF " + paciente.cpf + "!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, pode incluir!",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(postPaciente(paciente));
                }
            });
        }
    }

    const salvarPaciente = () => {
        setVisible(false);
        Swal.fire({
            title: "Tem certeza?",
            text: "Você vai alterar os dados do paciente " + paciente.nome + " portador do CPF " + paciente.cpf + "!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, pode alterar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(putPaciente(paciente));
            }
        });
    }

    const actionsTemplace = (rowData: PacienteState, options: ColumnBodyOptions) => {
        return (<div className="card flex flex-wrap justify-content-center gap-1">
            <Button type='button' icon="pi pi-eye" text onClick={() => consultarPaciente(rowData.cpf)} />
            <Button type='button' icon="pi pi-pencil" text onClick={() => alterarPaciente(rowData.cpf)} />
            <Button type='button' icon="pi pi-trash" text onClick={() => excluirPaciente(rowData.cpf, rowData.nome)} />
        </div>);
    };

    addLocale('pt-BR', {
        firstDayOfWeek: 1,
        dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
        dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
        monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
        monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
        today: "Hoje",
        clear: "Limpar"
    });

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Cadastro de Pacientes</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" placeholder="Procurar..." onInput={(e) => { const target = e.target as HTMLInputElement; setGlobalFilter(target.value); }} />
            </IconField>
        </div>
    );

    return (<div>
        <div className="card">
            <DataTable ref={dt} value={pacientes.pacientes} dataKey="cpf" paginator rows={9} size='small' className='m-4'
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                globalFilter={globalFilter} header={header} removableSort scrollable stripedRows
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="cpf" header="CPF" sortable body={renderizarCPF} style={{ width: '8%' }} />
                <Column field="nome" header="Nome" sortable style={{ width: '17%' }} />
                <Column field="data_nascimento" header="Data de Nascimento" sortable body={renderizarData} />
                <Column field="telefone" header="Telefone" sortable body={renderizarTelefone} style={{ width: '8%' }} />
                <Column field="email" header="E-mail" sortable />
                <Column field="endereco" header="Endereço" sortable />
                <Column style={{ flex: '0 0 4rem', width: '11rem' }} body={actionsTemplace}></Column>
            </DataTable>
        </div>
        {(visible) &&
            <Dialog header="Dados do Paciente" visible={visible} style={{ width: '50vw' }}
                onHide={() => { if (!visible) return; setVisible(false); }} >
                <div className='grid'>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="cpf">CPF</label>
                                <InputMask id="cpf" value={paciente.cpf} required disabled={readonly || (!inclusao)}
                                    onChange={(e) => dispatch(pacienteTypesChangeCpfAction(e.target.value))}
                                    mask="999.999.999-99" placeholder="999.999.999-99" />
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="nome">Nome</label>
                                <InputText id="nome" value={paciente.nome} required disabled={readonly}
                                    onChange={(e) => dispatch(pacienteTypesChangeNomeAction(e.target.value))} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid'>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="data_nascimento">Data de Nascimento</label>
                                <Calendar id="data_nascimento" disabled={readonly} required showIcon
                                    value={new Date(paciente.data_nascimento)}
                                    onChange={(e) => {
                                        if (moment(e.target.value).isValid()) {
                                            dispatch(pacienteTypesChangeDataNascimentoAction(moment(e.target.value).toDate().toLocaleDateString('pt-BR', { timeZone: 'UTC' })))
                                        }
                                    }}
                                    locale={ptBR.code} dateFormat="dd/mm/yy" />
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="sexo">Sexo</label>
                                <Dropdown id="sexo" value={paciente.sexo} optionLabel="label" disabled={readonly} required
                                    onChange={(e) => dispatch(pacienteTypesChangeSexoAction(e.value))}
                                    options={sexOptions} placeholder="Selecione o sexo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid'>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="cep">CEP</label>
                                <InputMask id="cep" value={paciente.cep} required disabled={readonly}
                                    onChange={(e) => dispatch(pacienteTypesChangeCepAction(e.target.value))}
                                    mask="99999-999" placeholder="99999-999" />
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="logradouro">Logradouro</label>
                                <InputText id="logradouro" value={paciente.logradouro} disabled={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid'>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="numero">Número</label>
                                <InputText id="numero" value={paciente.numero} disabled={readonly}
                                    onChange={(e) => dispatch(pacienteTypesChangeNumeroAction(e.target.value))} />
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="complemento">Complemento</label>
                                <InputText id="complemento" value={paciente.complemento} disabled={readonly}
                                    onChange={(e) => dispatch(pacienteTypesChangeComplementoAction(e.target.value))} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid'>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="bairro">Bairro</label>
                                <InputText id="bairro" value={paciente.bairro} disabled={true} />
                            </div>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="cidade">Cidade</label>
                                <InputText id="cidade" value={paciente.cidade} disabled={true} />
                            </div>
                        </div>
                    </div>
                    <div className='col-1'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="estado">Estado</label>
                                <InputText id="estado" value={paciente.estado} disabled={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid'>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="telefone">Telefone</label>
                                {/* <InputMask id="telefone" value={paciente.telefone} required disabled={readonly}
                                mask={paciente.telefone.length <= 14 ? "(99) 9999-9999" : "(99) 99999-9999"}
                                placeholder={paciente.telefone.length <= 14 ? "(99) 9999-9999" : "(99) 99999-9999"}
                                onChange={(e) => dispatch(pacienteTypesChangeTelefoneAction("" + e.target.value))} /> */}
                                <InputMask id="telefone" value={paciente.telefone} required disabled={readonly}
                                    mask="(99) 99999-9999" placeholder="(99) 99999-9999"
                                    onChange={(e) => dispatch(pacienteTypesChangeTelefoneAction("" + e.target.value))} />
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" type='email' value={paciente.email} disabled={readonly}
                                    onChange={(e) => dispatch(pacienteTypesChangeEmailAction(e.target.value))} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-content-end m-2">
                    <Button label={inclusao ? "Incluir" : "Alterar"} visible={!readonly} icon="pi pi-check"
                        onClick={(e) => (inclusao) ? salvarNovoPaciente() : salvarPaciente()} className='ml-1' />
                    <Button label="Fechar" className='ml-1' icon="pi pi-times" onClick={() => setVisible(false)} />
                </div>
            </Dialog >}
        <Button
            icon="pi pi-file"
            onClick={() => adicionarPaciente()}
            className="floating-button p-button-rounded p-button-primary"
        />
    </div >
    );
}


export default Paciente;