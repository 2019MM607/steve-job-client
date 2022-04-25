import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { Backdrop, Box, Container, Fade, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';


import { fetchWithNotoken, fetchWithtoken } from '../../Helpers/Fetch';
import { loadAlumnos } from '../../Redux/actions/alumnos';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },


    modalBox:{
        backgroundColor: theme.palette.secondary.light,
        width: '50%',
        borderRadius: '0.5rem',
    },

    form:{

    },

    textField:{
        marginTop: theme.spacing(3),
        width: '100%',
     },

     button:{ 
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.light,
        padding: theme.spacing(1),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),

        width: '100%',
      }
  
  }))

export const ActualizarAlumno = ({ isOpen, setIsOpen, alumno}) => {
    const [grados, setGrados] = useState(null);
    const dispatch = useDispatch()
    const loadGrados = async () => {
        const res = await fetchWithNotoken({}, 'GET', 'grados');
        const data = await res.json()
         setGrados(data)
      }
    
       useEffect(() => {
         loadGrados()
       }, []);

    //mandar el alumno al que se le hizo click en la card y poner los valores
    const formik = useFormik({
        initialValues: {
            nie:alumno?.nie, 
            primer_nombre:'', 
            segundo_nombre:'', 
            primer_apellido:'',
            segundo_apellido:'', 
            grado:alumno?.nombre
        }
      });

    const classess = useStyles()

    const handleCloseModal = () => {
        setIsOpen(false)
    }
  
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const res = await fetchWithtoken(formik.values, 'PUT', `alumno/${alumno?.id_alumno}`);
            const data = await res.json()

            if (data.ok) {
                dispatch(loadAlumnos())
                Swal.fire({
                    title: 'Exito',
                    text: data.msg,
                    icon: 'success',
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.msg,
                    icon: 'error',
                })
            }
            handleCloseModal()

        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Error al actualizar',
                icon: 'error',
            })
        }
    }

    return (
        <Modal
            className={classess.root}
            open={isOpen}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >

            <Fade in={isOpen}>
                <Container className={classess.modalBox}>
                    <CloseIcon onClick={handleCloseModal} style={{ float: 'right', margin: '1rem' }} />
                    <form onSubmit={handleSubmit} className={classess.form}>
                        <TextField autoComplete='off' className={classess.textField} disabled name='nie' type='text' value={formik.values.nie} onChange={formik.handleChange} label="Nie" />
                        <TextField autoComplete='off' className={classess.textField} name='primer_nombre' type='text' value={formik.values.primer_nombre} onChange={formik.handleChange} label="Primer nombre" />
                        <TextField autoComplete='off' className={classess.textField} name='segundo_nombre' type='text' value={formik.values.segundo_nombre} onChange={formik.handleChange} label="Segundo nombre" />
                        <TextField autoComplete='off' className={classess.textField} name='primer_apellido' type='text' value={formik.values.primer_apellido} onChange={formik.handleChange} label="Primer apellido" />
                        <TextField autoComplete='off' className={classess.textField} name='segundo_apellido' type='text' value={formik.values.segundo_apellido} onChange={formik.handleChange} label="Segundo apellido" />
                        <Select
                            name='grado'
                            onChange={formik.handleChange}
                            value={formik.values.grado}
                            className={classess.textField}
                        >
                            {
                                grados && grados.map((grado) => (
                                    <MenuItem value={grado.nombre} key={grado.id_grado}>{grado.nombre}</MenuItem>
                                ))
                            }
                        </Select>

                        <button type='submit' className={classess.button}>Actualizar alumno</button>

                    </form>
                </Container>
            </Fade>
        </Modal>
    )
}
