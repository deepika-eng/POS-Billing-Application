import React,{useState,useEffect} from 'react'
import {BrowserRouter} from "react-router-dom"
import NavBar from './components/NavBar'
import Typography from "@material-ui/core/Typography"
import { Container } from '@material-ui/core'
 
const App = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      handleAuth()
    }
  }, [])

  return (
    <Container>
      <Typography 
            variant = "h2"
            color = "secondary"
            align = "center"
      >
         Welcome to Billing </Typography>
      <BrowserRouter>
            <NavBar userLoggedIn={userLoggedIn} handleAuth= {handleAuth} />
      </BrowserRouter>
    </Container>
  )
}

export default App
