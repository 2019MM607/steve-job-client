import { Backdrop, Container, Fade, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core'
import { useFormik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import Swal from 'sweetalert2'

import React, { useEffect, useState } from 'react'
import { fetchWithNotoken, fetchWithtoken } from '../../Helpers/Fetch';



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
  

export const ModalPostNotas = ({id_alumno, isOpen, setIsOpen, refetch}) => {
    const classess = useStyles()

    const [materias, setMaterias] = useState(null);
    const [periodos, setPeriodos] = useState(['1', '2', '3']);


    const loadMaterias = async () => {
        const res = await fetchWithNotoken({}, 'GET', 'materias');
        const data = await res.json()
         setMaterias(data)
      }

    useEffect(() => {
        loadMaterias()
    }, []);

    const formik = useFormik({
        initialValues: {
            id_alumno: id_alumno,
            nota1: '',
            nota2: '',
            nota3: '',
            periodo: '',
            materia: '',

        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formik.values)

        const res = await fetchWithtoken(formik.values, 'POST', 'notas');
        const data = await res.json()

        if (!data.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.msg,
            })
        } else {

            Swal.fire({
                icon: 'success',
                title: 'Saved.',
                text: data.msg,
            })
        }
        console.log(data)
        refetch();
        setIsOpen(false)

    }


    const handleCloseModal = (e) => {
        e.preventDefault()
        setIsOpen(false)

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
                    <form className={classess.form} onSubmit={handleSubmit}>
                    <TextField autoComplete='off' className={classess.textField} name='id_alumno' type='number' disabled={true} value={formik.values.id_alumno} onChange={formik.handleChange} label="ID del alumno" />

                        <TextField autoComplete='off' className={classess.textField} name='nota1' type='number' value={formik.values.nota1} onChange={formik.handleChange} label="Nota 1" />
                        <TextField autoComplete='off' className={classess.textField} name='nota2' type='number' value={formik.values.nota2} onChange={formik.handleChange} label="Nota 2" />
                        <TextField autoComplete='off' className={classess.textField} name='nota3' type='number' value={formik.values.nota3} onChange={formik.handleChange} label="Nota 3" />
                        
                        <Select
                            name='periodo'
                            onChange={formik.handleChange}
                            value={formik.values.periodo}
                            className={classess.textField}
                            label="Periodo"

                        >
                            {
                                periodos && periodos.map((periodo) => (
                                    <MenuItem value={periodo} key={periodo}>{periodo}</MenuItem>
                                ))
                            }
                        </Select>

                        <Select
                            name='materia'
                            onChange={formik.handleChange}
                            value={formik.values.materia}
                            className={classess.textField}
                            label="Materia"

                        >
                            {
                                materias && materias.map((materia) => (
                                    <MenuItem value={materia.nombre_materia} key={materia.id_materia}>{materia.nombre_materia}</MenuItem>
                                ))
                            }
                        </Select>

                        <button type='submit' className={classess.button}>Enviar notas</button>

                    </form>
                </Container>
            </Fade>
        </Modal>
    )
}
