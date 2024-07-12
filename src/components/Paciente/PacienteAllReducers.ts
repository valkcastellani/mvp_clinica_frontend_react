import { PayloadAction } from '@reduxjs/toolkit';
import { PacienteAllState, PacienteTypes } from "./PacienteTypes";

export const initialPacienteAllState: PacienteAllState = {
    pacientes: []
}

export const PacienteAllReducers = (state: PacienteAllState = initialPacienteAllState, action: PayloadAction<string[]>) => {
    switch (action.type) {
        case PacienteTypes.PACIENTE_GET_ALL_DATA:
            return action.payload;

        default:
            return state;
    }
}
