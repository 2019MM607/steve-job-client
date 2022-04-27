import { makeStyles } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles((theme) => ({

  root:{
    width: '100vw',
    height: '100vh'
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

export const Home = () => {

  const classess = useStyles()
  return (
    <div className={classess.root}>

    </div>
  )
}
