import { Container, Fab, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DocenteCard } from './DocenteCard'
import AddIcon from '@material-ui/icons/Add';
import { CreateDocenteModal } from './CreateDocenteModal';
import { loadDocentes } from '../../Redux/actions/docentes';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
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
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: theme.spacing(2),
  },

  fab: {
    position: 'absolute',
    bottom: theme.spacing(5),
    right: theme.spacing(2),
  },
}))

export const Docentes = () => {
  const classess = useStyles()

  const dispatch = useDispatch()
  const {user, isLogged}=useSelector(state => state.authReducer);
  const {docentes}=useSelector(state => state.docentesReducer);
  const [isOpen, setIsOpen] = useState(false);


  const handleOpenModal = () => {
    setIsOpen(true);
  }

  return (
    <div className={classess.root}>
      <Container className={classess.title}>
          <Typography variant='h6' className={classess.text} color='primary'>Docentes</Typography>
      </Container>

      <Container className={classess.grid}>
        {
          docentes.data && docentes.data.map((docente, index) => (
            <DocenteCard docente={docente} key={index} />

          ))
        }

      </Container>

      <Fab color="primary" aria-label="add" className={classess.fab} onClick={handleOpenModal}>
        <AddIcon />
      </Fab>

      {
        isOpen &&
      <CreateDocenteModal isOpen={isOpen} setIsOpen={setIsOpen} />
      }
      


    </div>
  )
}
