import { createTheme } from "@material-ui/core";
import {deepPurple, grey}from '@material-ui/core/colors'




export const theme = createTheme({
    palette:{
        primary:{
            main: deepPurple[500],
            light:deepPurple[300],
            dark:deepPurple[900],
            
        },

        secondary:{
            main:grey[500],
            light:grey[100],
            dark:grey[900],
        },
        
        
    }

})