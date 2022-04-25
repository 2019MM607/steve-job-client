import React, { useState } from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';

import VisibilityIcon from '@material-ui/icons/Visibility';
import { ActualizarAlumno } from './ActualizarAlumno';


const useStyles = makeStyles((theme) => ({
    root:{
     
    },
  
  }))

export const AlumnoCard = ({alumno}) => {
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
            ID:{alumno?.id_alumno}
          </Typography>
            <Typography gutterBottom variant="h6">
              {alumno?.nombre_completo}  
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
             NIE: {alumno?.nie}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {alumno?.nombre}
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
            <ActualizarAlumno isOpen={isOpen} setIsOpen={setIsOpen} alumno={alumno} />
          }
        </CardActions>
      </Card>
    )
}

