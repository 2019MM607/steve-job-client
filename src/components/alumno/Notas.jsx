import { Box, Button, CircularProgress, Container, Fab, makeStyles, Typography } from '@material-ui/core'
import { PDFViewer } from '@react-pdf/renderer'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { fetchWithtoken } from '../../Helpers/Fetch'
import { TableNotas } from '../docente/TableNotas'
import { NotasPDF } from './NotasPDF'

const useStyles = makeStyles((theme) => ({

  root:{
    width: '100%',
  },

  text:{
    
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),

  },

  tableContainer:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },

  mainContainer:{
    display: 'flex',
    flexDirection: 'column',
  },

  fab:{
    alignSelf: 'flex-end',
    marginTop: theme.spacing(3)
  },

  btn:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    float: 'right',
    padding: theme.spacing(1),
   
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: '0.5rem',
    
  }

}))


export const Notas = () => {
  const classess = useStyles()
  const {user, isLogged}=useSelector(state => state.authReducer);
  const [openNotasP1, setOpenNotasP1] = useState(false);
  const [openNotasP2, setOpenNotasP2] = useState(false);
  const [openNotasP3, setOpenNotasP3] = useState(false);


  const loadInfo = async () =>{
    const res = await fetchWithtoken({}, 'GET', `notas/${user?._id}`)
    const data = await res.json()
   return data
  }
const {data, isError, isLoading,refetch } = useQuery(['notas'], loadInfo)


  return (
    <div className={classess.root}>
      {
        isLoading && <CircularProgress />
      }

      <Container>
        <Typography color="primary" variant='h6' className={classess.text}>
          {data ? data?.data?.primer_periodo[0].alumno : ''}
        </Typography>
      </Container>


      <Container className={classess.mainContainer}>

        <Box className={classess.tableContainer}>
          <Typography variant='h6' color='secondary'>Periodo 1</Typography>
          <TableNotas notas={data ? data?.data?.primer_periodo : null} />
          <Button variant='contained' color='primary' className={classess.btn} onClick={() => setOpenNotasP1(!openNotasP1)} >
            Descargar reporte del periodo 1
          </Button>

          {
            openNotasP1 &&
          
            <PDFViewer height={1000} width={1000} style={{margin:'0 auto'}} >
            <NotasPDF notas={data ? data?.data?.primer_periodo : ''} user={user} periodo='1' />
          </PDFViewer>
          
          }
        </Box>

        <Box className={classess.tableContainer}>
          <Typography variant='h6' color='secondary'>Periodo 2</Typography>
          <TableNotas notas={data ? data?.data?.segundo_periodo : []} />
          <Button variant='contained' color='primary' className={classess.btn} onClick={ ()=> setOpenNotasP2(!openNotasP2)}>Descargar reporte del periodo 2</Button>

          {
            openNotasP2 &&
            <PDFViewer height={1000} width={1000} style={{margin:'0 auto'}} >
                         <NotasPDF notas={data ? data?.data?.segundo_periodo : []} user={user} periodo='2' />

            </PDFViewer>
          }
        </Box>

        <Box className={classess.tableContainer}>
          <Typography variant='h6' color='secondary'>Periodo 3</Typography>
          <TableNotas notas={data ? data?.data?.tercer_periodo : null} />
          <Button variant='contained' color='primary' className={classess.btn} onClick={ ()=> setOpenNotasP3(!openNotasP3)}>Descargar reporte del periodo 3</Button>

          {
            openNotasP3 &&
            <PDFViewer height={1000} width={1000} style={{margin:'0 auto'}} >
                          <NotasPDF notas={data ? data?.data?.tercer_periodo : []} user={user} periodo='3'/>

            </PDFViewer>
          }
        </Box>

      </Container>


    </div>
  )
}
