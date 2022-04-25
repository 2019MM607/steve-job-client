import { fetchWithtoken } from "../../Helpers/Fetch"
import { types } from "../types";


export const loadDocentes =  () => {
    return async (dispatch) => {
        try {
            const res = await fetchWithtoken({}, "GET", "docente");
            const docentes = await res.json();
            dispatch(setDocentes(docentes));
        }
        catch (error) {
            console.log(error)
        }

    }
}


export const setDocentes = (docentes) => {
    return {
        type: types.DOCENTES_GET_ALL,
        payload: {
            docentes
        }
    }
}