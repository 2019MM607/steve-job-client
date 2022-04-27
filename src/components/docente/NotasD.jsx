import { Box, CircularProgress, Container, Fab, makeStyles, Tooltip, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';


import { fetchWithtoken } from '../../Helpers/Fetch'
import { TableNotas } from './TableNotas'
import { ModalPostNotas } from './ModalPostNotas';

const useStyles = makeStyles((theme) => ({

  root:{
    width: '100%',
  },

  text:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },

  tableContainer:{
    marginTop: theme.spacing(2)
  },

  mainContainer:{
    display: 'flex',
    flexDirection: 'column',
  },

  fab:{
    alignSelf: 'flex-end',
    marginTop: theme.spacing(3)
  }

}))



export const NotasD = () => {
  const {id} = useParams()
  const [isOpen, setIsOpen] = useState(false);
  const id_alumno = parseInt(id)
  const classess = useStyles()
 

  const loadInfo = async () =>{
    const res = await fetchWithtoken({}, 'GET', `notas/${id_alumno}`)
    const data = await res.json()
   return data
  }
const {data, isError, isLoading,refetch } = useQuery(['notas'], loadInfo)

const handleOpenClose= (e)=>{
  e.preventDefault()
  setIsOpen(!isOpen)
}



  return (
    <div className={classess.root}>
      {
        isLoading && <CircularProgress />
      }

      <Container>
        <Typography color="primary" variant='h6'  className={classess.text}>
         {data ?  data?.data?.primer_periodo[0].alumno : '' }
        </Typography>
      </Container>


      <Container className={classess.mainContainer}>
       
        <Box  className={classess.tableContainer}>
        <Typography variant='h6' color='secondary'>Periodo 1</Typography>
          <TableNotas notas={data ? data?.data?.primer_periodo : null}/>
        </Box>

        <Box  className={classess.tableContainer}>
      <Typography variant='h6' color='secondary'>Periodo 2</Typography>
          <TableNotas notas={data ? data?.data?.segundo_periodo : null} />
          
        </Box>

        <Box  className={classess.tableContainer}>
      <Typography variant='h6' color='secondary'>Periodo 3</Typography>
          <TableNotas notas={data ? data?.data?.tercer_periodo : null} />

        </Box>

       
          <Fab color="primary" className={classess.fab} onClick={handleOpenClose} >
            <AddIcon />
          </Fab>

          {
            isOpen && <ModalPostNotas id_alumno={id_alumno} isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch}/>
          }
       
        
      </Container>


    </div>
  )
}
