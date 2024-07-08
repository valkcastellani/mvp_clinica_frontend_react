import React from 'react';
import moment from 'moment';


import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { ButtonGroup } from 'primereact/buttongroup';
import { Button } from 'primereact/button';

import { excluirPaciente, getPacientes } from './Paciente.service';
import { IPacienteComEndereco, PacienteEmBranco, ISexo, sexOptions } from './PacienteTypes';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './Paciente.css';

const Paciente = () => {
    const [pacientes, setPacientes] = React.useState<IPacienteComEndereco[]>([]);
    const [paciente, setPaciente] = React.useState<IPacienteComEndereco>(PacienteEmBranco);
    const [visible, setVisible] = React.useState(false);
    const [readonly, setReadonly] = React.useState(false);
    const [sexo, setSexo] = React.useState<ISexo | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            let data = await getPacientes();
            let pacientes: IPacienteComEndereco[] = [];
            for (const element of data.pacientes) {
                pacientes.push(element);
            }
            setPacientes(pacientes);
        };

        fetchData();
    }, []);

    React.useEffect(() => {
        const indiceSexo = sexOptions.findIndex((item) => item.value === paciente.sexo);
        setSexo(sexOptions[indiceSexo]);
    }, [paciente])

    const formatarCPF = (rowData: IPacienteComEndereco) => {
        const cpfStr = rowData.cpf.toString().padStart(11, '0');
        return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatarData = (rowData: IPacienteComEndereco) => {
        return moment(rowData.data_nascimento).format('DD/MM/YYYY')
    };

    const formatarTelefone = (rowData: IPacienteComEndereco) => {
        const telStr = rowData.telefone.toString().padStart(11, '0');
        return telStr.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    const adicionarPaciente = () => {
        setPaciente(PacienteEmBranco);
        setReadonly(false)
        setVisible(true);
    }

    const consultarPaciente = (rowData: IPacienteComEndereco) => {
        setPaciente(rowData);
        setReadonly(true)
        setVisible(true);
    }

    const actionsTemplace = (rowData: IPacienteComEndereco, options: ColumnBodyOptions) => {
        return (<div className="card flex flex-wrap justify-content-center gap-3">
            <ButtonGroup>
                <Button type='button' icon="pi pi-eye" text onClick={() => consultarPaciente(rowData)} />
                <Button type='button' icon="pi pi-pencil" text onClick={() => excluirPaciente(rowData.cpf, rowData.nome)} />
                <Button type='button' icon="pi pi-trash" text onClick={() => excluirPaciente(rowData.cpf, rowData.nome)} />
            </ButtonGroup>
        </div>);
    };


    return (<div>
        <div className="card">
            <DataTable value={pacientes} removableSort scrollable stripedRows paginator rows={15}
                scrollHeight={`calc(${window.innerHeight}px - 83px)`} tableStyle={{ minWidth: '50rem' }}>
                <Column field="cpf" header="CPF" sortable body={formatarCPF} />
                <Column field="nome" header="Nome" sortable />
                <Column field="data_nascimento" header="Data de Nascimento" sortable body={formatarData} />
                <Column field="telefone" header="Telefone" sortable body={formatarTelefone} />
                <Column field="email" header="E-mail" sortable />
                <Column field="endereco" header="Endereço" sortable />
                <Column style={{ flex: '0 0 4rem' }} body={actionsTemplace}></Column>
            </DataTable>
        </div>
        <Dialog header="Dados do Paciente" visible={visible} style={{ width: '50vw' }}
            maximizable onHide={() => { if (!visible) return; setVisible(false); }} >
            <div className='grid'>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="cpf">CPF</label>
                            <InputNumber id="cpf" value={paciente.cpf} disabled={readonly} />
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="nome">Nome</label>
                            <InputText id="nome" value={paciente.nome} disabled={readonly} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid'>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="data_nascimento">Data de Nascimento</label>
                            <Calendar id="data_nascimento" value={moment(paciente.data_nascimento).toDate()} disabled={readonly} showIcon />
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="sexo">Sexo</label>
                            <Dropdown id="sexo" value={sexo} optionLabel="label" options={sexOptions} disabled={readonly} placeholder="Selecione o sexo" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid'>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="cep">CEP</label>
                            <InputNumber id="cep" value={paciente.cep} disabled={readonly} />
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="logradouro">Logradouro</label>
                            <InputText id="logradouro" value="" disabled={true} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid'>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="numero">Número</label>
                            <InputText id="numero" value={paciente.numero} disabled={readonly} />
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="complemento">Complemento</label>
                            <InputText id="complemento" value={paciente.complemento} disabled={readonly} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid'>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="bairro">Bairro</label>
                            <InputText id="bairro" value="" disabled={true} />
                        </div>
                    </div>
                </div>
                <div className='col-5'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="cidade">Cidade</label>
                            <InputText id="cidade" value="" disabled={true} />
                        </div>
                    </div>
                </div>
                <div className='col-1'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="estado">Estado</label>
                            <InputText id="estado" value="" disabled={true} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid'>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="telefone">Telefone</label>
                            <InputNumber id="telefone" value={paciente.telefone} disabled={readonly} />
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={paciente.email} disabled={readonly} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-d-flex p-jc-end m-2">
                <Button label="Fechar" icon="pi pi-times" onClick={() => setVisible(false)} />
            </div>
        </Dialog >
        <Button
            icon="pi pi-file"
            onClick={() => adicionarPaciente()}
            className="floating-button p-button-rounded p-button-primary"
        />
    </div >

    );
}

export default Paciente;