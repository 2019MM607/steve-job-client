import { Button, Card, CardActionArea, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';

import VisibilityIcon from '@material-ui/icons/Visibility';
import React, { useEffect, useState } from 'react'
import { ActualizarDocente } from './ActualizarDocente';


const useStyles = makeStyles((theme) => ({
    root:{
     
    },
  
  }))
  

export const DocenteCard = ({docente}) => {

  const [isOpen, setIsOpen] = useState(false);


  const handleOpenModal = () => {
    setIsOpen(true);
  }

    const classess = useStyles()
  return (
    <Card className={classess.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="caption" component="h2">
            ID:{docente.id_docente}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {docente.nombre_docente}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            Materia: {docente.materia}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            Grado: {docente.grado}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant='contained' color="primary">
          <VisibilityIcon />
        </Button>
        <Button size="small" variant='contained' color="primary" onClick={handleOpenModal}>
          <EditIcon />
        </Button>

        {
          isOpen &&
          <ActualizarDocente isOpen={isOpen} setIsOpen={setIsOpen} docente={docente}/>
        }

      </CardActions>
    </Card>
  )
}
