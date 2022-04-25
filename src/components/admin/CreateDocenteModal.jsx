import { Backdrop, Box, Container, Fade, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';       


import { fetchWithNotoken, fetchWithtoken } from '../../Helpers/Fetch';
import { loadDocentes } from '../../Redux/actions/docentes';


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
export const CreateDocenteModal = ({ isOpen, setIsOpen}) => {

  const classess = useStyles()

  const dispatch = useDispatch()
  const [materias, setMaterias] = useState(null);
  const [grados, setGrados] = useState(null);


   const loadMaterias = async () => {
     const res = await fetchWithNotoken({}, 'GET', 'materias');
     const data = await res.json()
      setMaterias(data)
   }

   const loadGrados = async () => {
    const res = await fetchWithNotoken({}, 'GET', 'grados');
    const data = await res.json()
     setGrados(data)
  }

   useEffect(() => {
     loadMaterias()
     loadGrados()
   }, []);

  const formik = useFormik({
    initialValues: {
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        materia: '',
        grado: '',
    }
  });

  const handleCloseModal = () => {
      setIsOpen(false)
  }

    const handlePost = async (e) => {
        e.preventDefault()
        try {
            const res = await fetchWithtoken(formik.values, 'POST', 'docente');
            const data = await res.json()

            if (data.ok) {
                dispatch(loadDocentes())
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
                text: 'Error al crear docente',
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
                  <form onSubmit={handlePost} className={classess.form}>
                      <TextField autoComplete='off'  className={classess.textField} name='primer_nombre' type='text' value={formik.values.primer_nombre} onChange={formik.handleChange} label="Primer nombre" />
                      <TextField autoComplete='off'  className={classess.textField} name='segundo_nombre' type='text' value={formik.values.segundo_nombre} onChange={formik.handleChange} label="Segundo nombre" />
                      <TextField  autoComplete='off' className={classess.textField} name='primer_apellido' type='text' value={formik.values.primer_apellido} onChange={formik.handleChange} label="Primer apellido" />
                      <TextField autoComplete='off'  className={classess.textField} name='segundo_apellido' type='text' value={formik.values.segundo_apellido} onChange={formik.handleChange} label="Segundo apellido" />
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

                      <Select
                          name='grado'
                          onChange={formik.handleChange}
                          value={formik.values.grado}
                          className={classess.textField}
                          label="Grado"

                      >
                          {
                              grados && grados.map((grado) => (
                                  <MenuItem value={grado.nombre} key={grado.id_grado}>{grado.nombre}</MenuItem>
                              ))
                          }
                      </Select>


                <button type='submit'  className={classess.button}>Crear docente</button>

                  </form>
              </Container>
          </Fade>
      </Modal>
  )
}
