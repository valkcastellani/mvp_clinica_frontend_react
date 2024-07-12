import { configureStore } from '@reduxjs/toolkit'
import { PacienteReducers } from '../components/Paciente/PacienteReducers'
import { PacienteAllReducers } from '../components/Paciente/PacienteAllReducers'
import { combineReducers } from 'redux'

export const store = configureStore({
    reducer: combineReducers({
        paciente: PacienteReducers,
        pacientes: PacienteAllReducers
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

