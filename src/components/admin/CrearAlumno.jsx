import { Backdrop, Box, Container, Fade, makeStyles, MenuItem, Modal, Select, TableContainer, TextField } from '@material-ui/core'
import { useFormik } from 'formik';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';


import { fetchWithNotoken, fetchWithtoken } from '../../Helpers/Fetch';
import { loadAlumnos } from '../../Redux/actions/alumnos';

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

export const CrearAlumno = ({ isOpen, setIsOpen}) => {
  const classess = useStyles()

  const dispatch = useDispatch()
  const [grados, setGrados] = useState(null);

  const loadGrados = async () => {
    const res = await fetchWithNotoken({}, 'GET', 'grados');
    const data = await res.json()
     setGrados(data)
  }

   useEffect(() => {
     loadGrados()
   }, []);

    const formik = useFormik({
        initialValues: {
            nie:'', 
            primer_nombre:'', 
            segundo_nombre:'', 
            primer_apellido:'',
            segundo_apellido:'', 
            grado:''
        }
      });


    const handleCloseModal = () => {
        setIsOpen(false)
    }
  
    const handleSubmit= async (e)=>{
      e.preventDefault()
      try {
          const res = await fetchWithtoken(formik.values, 'POST', 'alumno');
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
                  <form className={classess.form} onSubmit={handleSubmit}>
                      <TextField autoComplete='off' className={classess.textField} name='nie' type='text' value={formik.values.nie} onChange={formik.handleChange} label="Nie" />
                      <TextField autoComplete='off' className={classess.textField} name='primer_nombre' type='text' value={formik.values.primer_nombre} onChange={formik.handleChange} label="Primer nombre" />
                      <TextField autoComplete='off' className={classess.textField} name='segundo_nombre' type='text' value={formik.values.segundo_nombre} onChange={formik.handleChange} label="Segundo nombre" />
                      <TextField autoComplete='off' className={classess.textField} name='primer_apellido' type='text' value={formik.values.primer_apellido} onChange={formik.handleChange} label="Primer apellido" />
                      <TextField autoComplete='off' className={classess.textField} name='segundo_apellido' type='text' value={formik.values.segundo_apellido} onChange={formik.handleChange} label="Segundo apellido" />
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

                      <button type='submit' className={classess.button}>Crear alumno</button>

                  </form>
              </Container>
          </Fade>
  </Modal>
  )
}
