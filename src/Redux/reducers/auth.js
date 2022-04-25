import { types } from "../types"

const initial={
    isLogged:false,
    user:null,
}

export const authReducer = (state=initial, action) =>{
    switch(action.type){
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLogged: true,
                user: action.payload.credenciales
            }
        
        default:
            return state
    }
}