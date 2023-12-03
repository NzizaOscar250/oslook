import React from "react"
import MainRouter from "./MainRouter"

import {BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core"
import theme from "./theme"
import "./index.css"


export default function App(){

  return (<>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
            <MainRouter/>
        </ThemeProvider>
      </BrowserRouter>
  </>)
}