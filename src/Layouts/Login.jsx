import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../Redux/actions/auth';

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor : theme.palette.secondary.light,
        margin:theme.spacing(2),
        height: 'auto',
        width: '30%',
        alignSelf: 'center',
        padding: theme.spacing(2),
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-around',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          height: 'auto',
        }
    }, 

    title:{ 
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.light,
        display: 'flex',
        alignSelf: 'center',
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1),

        borderRadius: '0.5rem',

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
     }
}))


export const Login = () => {
  
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = (e) => { 
    e.preventDefault();
    dispatch(startLogin(formik.values.email, formik.values.password))

  }

    const classes = useStyles()
  return (
    <Box boxShadow={4} className={classes.root}>
      <Typography className={classes.title} variant="h5" component="h1">
          Login
      </Typography>
      <div>
        <TextField className={classes.textField} name='email' value={formik.values.email} onChange={formik.handleChange} label="Email" autoComplete='off' />
        <TextField className={classes.textField} name='password' value={formik.values.password} onChange={formik.handleChange} label="Password" type='password' autoComplete='off'/>
      </div>
      <button onClick={handleLogin}  className={classes.button}>Login</button>
      <Link to='/auth/register'>registrarse</Link>
    </Box>
  )
}
