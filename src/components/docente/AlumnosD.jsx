import { Box, Card, CardActionArea, Container, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  fetchWithtoken } from '../../Helpers/Fetch';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },

  title: {
    marginTop: theme.spacing(2),
  },

  text: {
    fontWeight: theme.typography.fontWeightLight,
  },

  grid: {
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: theme.spacing(3),
    marginTop: theme.spacing(2),
  },

  gridItem: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
  }

}))

export const AlumnosD = () => {
  const classess = useStyles()
  const navigate = useNavigate()

  const [alumnos, setAlumnos] = useState(null);
  const {user, isLogged}=useSelector(state => state.authReducer);

  
  const loadAlumnos = async () => {

    const response = await fetchWithtoken({rol:user?.rol, docente:user?.name}, 'POST', 'alumno/docente');
    const data = await response.json()
    setAlumnos(data.data)
   
  }

  useEffect(() => {
   loadAlumnos()
  },[])

  



  return (
    <div className={classess.root}>
      <Container className={classess.title}>
        <Typography variant='h6' className={classess.text} color='primary'>Mis alumnos</Typography>
      </Container>


      <Container className={classess.grid}>

        {
          alumnos ? alumnos.map((alumno, index) => (
            <Card key={index}>
              <CardActionArea className={classess.gridItem} onClick={()=> navigate(`/notas/${alumno.id_alumno}`)}>
                <Typography variant='h6' className={classess.text} color='primary'>{alumno.alumno}</Typography>
                <Typography variant='h6' className={classess.text} color='primary'>{alumno.nie}</Typography>
              </CardActionArea>
            </Card>
          ))
            :
            <Box boxShadow={1}>
              <Typography variant='h6' className={classess.text} color='primary'>Este docente aun no tiene alumnos asignados</Typography>
            </Box>
        }
      </Container>

    </div>
  )
}
