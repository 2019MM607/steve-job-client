import { Avatar, Box, Chip, Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root:{
    height: '100vh',
    width: '100vvw',
  },

  navbar:{
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
  },
  links:{
      width: '40%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', 
  },

  link:{
      marginRight: theme.spacing(2),
      color: theme.palette.primary.main,
  },

  userInfo:{
    display: 'flex',
    width: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  userName:{
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  logoutBtn :{
    alignSelf: 'center',
    cursor: 'pointer',
  }
}))




export const AlumnoLayout = ({ children }) => {

  const { user, isLogged } = useSelector(state => state.authReducer);
  const classess = useStyles()


  const handleLogout = () => {
    window.location.reload()
  }
  
  return (
    <div className={classess.root}>

      <Box boxShadow={3} className={classess.navbar}>
        <Container className={classess.links}>
        <Typography className={classess.userName}>Notas</Typography>
        </Container>

        <Container className={classess.userInfo}>
          <Typography className={classess.userName}>{user.name}</Typography>
          <Avatar alt="Remy Sharp" src="../../public/profile.jpg" />
          <Chip label={user?.rol} style={{ marginLeft: '0.5rem' }} />
        </Container>

        <PowerSettingsNewIcon color="primary" className={classess.logoutBtn} onClick={handleLogout}/>


      </Box>


      <Outlet />
    </div>


  )
}
