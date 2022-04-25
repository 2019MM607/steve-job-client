import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Outlet } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor : theme.palette.primary.main,
    margin:theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    padding: theme.spacing(2),
  },

  title:{
    color: theme.palette.secondary.light,
    fontSize: '2rem',
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      padding: theme.spacing(1),
     }
   }
}))


export const AuthLayout = () => {

  const classes = useStyles()

  return (
    <div className={classes.root} >
      <Typography className={classes.title} variant="h6"  >
        Autenticación
      </Typography>
      <Outlet />
    </div>
  )
}
