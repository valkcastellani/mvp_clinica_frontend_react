import { PacienteTypes } from "./PacienteTypes"

export const pacienteTypesGetAllDataAction = (data: any) => ({
    type: PacienteTypes.PACIENTE_GET_ALL_DATA,
    payload: data
})
