import { fetchWithtoken } from "../../Helpers/Fetch";
import { types } from "../types";


export const loadAlumnos =  () => {
    return async (dispatch) => {
        try {
            const res = await fetchWithtoken({}, "GET", "alumno");
            const alumnos = await res.json();
            dispatch(setAlumnos(alumnos));
            
        }
        catch (error) {
            console.log(error)
        }

    }
}


export const setAlumnos = (alumnos) => {
    return {
        type: types.ALUMNOS_GET_ALL,
        payload: {
            alumnos
        }
    }
}