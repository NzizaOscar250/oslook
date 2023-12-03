import { createTheme } from "@material-ui/core";
import { pink,blue,grey } from "@material-ui/core/colors";

const theme = createTheme({
   
    typography: {
        useNextVariants: true,
        },
        grays:grey[700],
        palette: {
        primary: {
        light: '#5c67a3',
        main: blue[800],
        dark: blue[800],
        contrastText: '#fff',
        },
       
        openTitle: '#3f4771',
        protectedTitle: pink['400'],
        type: 'light'
        }
       
})

export default theme;