import { Box, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startRegister } from '../Redux/actions/auth';


const useStyles = makeStyles((theme) => ({
  root:{
      backgroundColor : theme.palette.secondary.light,
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

export const Register = () => {

    const classes = useStyles()
    const dispatch = useDispatch()

    const formik = useFormik({
      initialValues: {
        primer_nombre:'',
        segundo_nombre:'',
        primer_apellido:'',
        segundo_apellido:'',
        password: '',
        rol:''
      }
    });


    const handleRegister = (e) => {
      e.preventDefault()
      dispatch(startRegister(formik.values.primer_nombre, 
                             formik.values.segundo_nombre, 
                             formik.values.primer_apellido, 
                             formik.values.segundo_apellido, 
                             formik.values.password, 
                             formik.values.rol))
      
    }
  return (


    <Box boxShadow={4} className={classes.root}>
    <Typography className={classes.title} variant="h5" component="h1">
        Registrarse
    </Typography>
    <div>
      <TextField className={classes.textField} name='primer_nombre' type='text' value={formik.values.primer_nombre} onChange={formik.handleChange} label="Primer nombre" />
      <TextField className={classes.textField} name='segundo_nombre' type='text' value={formik.values.segundo_nombre} onChange={formik.handleChange} label="Segundo nombre" />
      <TextField className={classes.textField} name='primer_apellido' type='text' value={formik.values.primer_apellido} onChange={formik.handleChange} label="Primer apellido" />
      <TextField className={classes.textField} name='segundo_apellido' type='text' value={formik.values.segundo_apellido} onChange={formik.handleChange} label="Segundo apellido" />
      <TextField className={classes.textField} name='password' type='password' value={formik.values.password} onChange={formik.handleChange} label="Password" />

        <Select
          name='rol'
          onChange={formik.handleChange}
          value={formik.values.rol}	
          className={classes.textField}
        >
          <MenuItem value='Administrador'>Administrador</MenuItem>
          <MenuItem value='Alumno'>Alumno</MenuItem>
          <MenuItem value='Docente'>Docente</MenuItem>
        </Select>

    </div>
    <button onClick={handleRegister}  className={classes.button}>Registrarse</button>
  </Box>
  )
}
