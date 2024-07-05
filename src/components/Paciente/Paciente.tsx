import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getPacientes } from './Paciente.service';
import { IPacienteComEndereco } from './PacienteTypes';
import { format } from 'date-fns';

const Paciente = () => {
    const [pacientes, setPacientes] = React.useState<IPacienteComEndereco[]>([]);

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

    const formatarCPF = (rowData: any) => {
        const cpfStr = rowData.cpf.toString().padStart(11, '0');
        return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatarData = (rowData: any) => {
        return format(new Date(rowData.data_nascimento), 'dd/MM/yyyy')
    };

    const formatarTelefone = (rowData: any) => {
        const telStr = rowData.telefone.toString().padStart(11, '0');
        return telStr.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };
    return (
        <div className="card">
            <DataTable value={pacientes} removableSort scrollable scrollHeight={`calc(${window.innerHeight}px - 83px)`} tableStyle={{ minWidth: '50rem' }}>
                <Column field="cpf" header="CPF" sortable style={{ width: '6%' }} body={formatarCPF} />
                <Column field="nome" header="Nome" sortable style={{ width: '20%' }} />
                <Column field="data_nascimento" header="Data de Nascimento" sortable style={{ width: '6%' }} body={formatarData} />
                <Column field="telefone" header="Telefone" sortable style={{ width: '7%' }} body={formatarTelefone} />
                <Column field="email" header="E-mail" sortable style={{ width: '10%' }} />
                <Column field="endereco" header="Endereço" sortable style={{ width: '31%' }} />
            </DataTable>
        </div>
    );
}

export default Paciente;