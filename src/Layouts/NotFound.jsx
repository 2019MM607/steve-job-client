import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

  root:{
    backgroundColor : theme.palette.primary.main,
    height : '50vh',
    width: '80%',
    margin: 'auto',
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  text:{
    color: theme.palette.secondary.light,
  }
}))

export const NotFound = () => {
  const classes = useStyles()
  return (
      <Box boxShadow={3} className={classes.root} >
          <Typography className={classes.text}>
            Recurso no encontrado o no hay un usuario logeado con su respectivo rol, click en el siguiente enlace para logearse
          </Typography>
          <Link className='ml-5 text-blue-900 text-xl' to='/auth/login'>Login</Link>

      </Box>
  )
}
