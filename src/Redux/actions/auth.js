import { types } from "../types";
import Swal from 'sweetalert2'

const ENDPOINT_TO_LOGIN= "http://localhost:4000/api/auth/signin";
const ENDPOINT_TO_REGISTER= "http://localhost:4000/api/auth/signup";


export const startLogin = (email,password) => {

    const payload ={
        email,
        password
    }
    return async (dispatch) => {
        try {
          const res = await fetch(ENDPOINT_TO_LOGIN, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          });

          const credenciales = await res.json();
          
          if (credenciales.ok) {
            
            localStorage.setItem("token", credenciales.token);
            dispatch(setLogin(credenciales));

          }else{
            console.log(credenciales)
            Swal.fire(credenciales.msg)
          }

        } catch (error) {
          console.log(error.msg);
        }
        
      }
}



export const startRegister = (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido,password,rol) => {
  
      const payload ={
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        password,
        rol
      }
      
      return async (dispatch) => {
          try {
            const res = await fetch(ENDPOINT_TO_REGISTER, {
              method: "POST",
              body: JSON.stringify(payload),
              headers: {"Content-type": "application/json; charset=UTF-8"}
            });
  
            const credenciales = await res.json();
            
           if (credenciales.ok) {
           
            localStorage.setItem("token", credenciales.token);
             dispatch(setLogin(credenciales));
           }else{
             
             Swal.fire(credenciales.msg)
           }
  
          } catch (error) {
            console.log(error);
          }
        }
}


export const setLogin = (credenciales) => {
    return{
        type : types.AUTH_LOGIN_SUCCESS,
        payload : {
            credenciales
        }
}
}



