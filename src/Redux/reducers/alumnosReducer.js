import {types} from '../types';
export const alumnosReducer = (state = [], action) => {
    switch (action.type) {
        case types.ALUMNOS_GET_ALL:
            return {
                ...state,
                alumnos: action.payload.alumnos
            }
        default:
            return state
    }
}