import React, { useState } from 'react'
import { Container, Fab, makeStyles, Typography } from '@material-ui/core'
import {AlumnoCard} from './AlumnoCard'
import AddIcon from '@material-ui/icons/Add';
import { CrearAlumno } from './CrearAlumno';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles ((theme) => ({
  root:{
    width: '100vw',
    
  },

  title:{
    marginTop: theme.spacing(2),
    
  },

  text:{
    fontWeight: theme.typography.fontWeightLight,
  },

  grid:{
   
   padding: theme.spacing(2),
   display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: theme.spacing(2),
   
  },

  
    fab: {
      position: 'absolute',
      bottom: theme.spacing(5),
      right: theme.spacing(2),
    },
  
}))

export const Alumnos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classess = useStyles()
  const dispatch = useDispatch()
  const {alumnos}=useSelector(state => state.alumnosReducer);



  const handleOpenModal = () => {
    setIsOpen(true);
  }
  return (
    <div className={classess.root}>
    <Container className={classess.title}>
        <Typography variant='h6' className={classess.text} color='primary'>Alumnos</Typography>
    </Container>

      <Container className={classess.grid}>
        {
          alumnos.data && alumnos.data.map((alumno, index) => (
            <AlumnoCard alumno={alumno} key={index} />

          ))
        }

      </Container>

      <Fab color="primary" aria-label="add" className={classess.fab} onClick={handleOpenModal}>
        <AddIcon />
      </Fab>

      {
        isOpen &&
      <CrearAlumno isOpen={isOpen} setIsOpen={setIsOpen} />
      }


  </div>
  )
}
