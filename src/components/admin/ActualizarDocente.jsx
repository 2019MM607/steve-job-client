import { Backdrop, Box, Container, Fade, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import { fetchWithNotoken, fetchWithtoken } from '../../Helpers/Fetch';
import { useDispatch } from 'react-redux';
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

export const ActualizarDocente = ({docente, isOpen, setIsOpen}) => {
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

      materia: docente.materia,
      grado: docente.grado,
    }
  });

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await fetchWithtoken(formik.values, 'PUT', `docente/${docente.id_docente}`);
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
          <form className={classess.form} onSubmit={handleUpdate}>

            <Select
              name='materia'
              onChange={formik.handleChange}
              value={formik.values.materia}
              className={classess.textField}
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
            >
              {
                grados && grados.map((grado) => (
                  <MenuItem value={grado.nombre} key={grado.id_grado}>{grado.nombre}</MenuItem>
                ))
              }
            </Select>
            <button  type='submit' className={classess.button}>Actualizar docente</button>
          </form>

        </Container>
      </Fade>
    </Modal>
  )
}
