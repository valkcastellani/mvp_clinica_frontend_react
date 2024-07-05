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