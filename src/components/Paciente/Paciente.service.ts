import Swal from "sweetalert2";
import http from "../../util/http"

export async function getPacientes() {
    try {
        let asyncPacientes = await http.get("/paciente").then((res) => res.data);
        return asyncPacientes;
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
    }
    return [];
}

export const excluirPaciente = (cpf: number, nome: string) => {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você vai excluir o paciente " + nome + " portador do CPF " + cpf + "!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, pode excluir!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            const url = "/paciente/" + cpf;
            http.delete(url)
                .then((res) => res.data)
                .then((data) => {
                    Swal.fire({
                        title: "Excluído!",
                        text: "" + data.message,
                        icon: "success"
                    });
                }).catch((error) => {
                    Swal.fire({
                        title: 'Erro!',
                        text: error.message,
                        icon: 'error'
                    })
                });
        }
    });
}
