import React from 'react' 
import {Link, Route, withRouter} from "react-router-dom"
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import Customers from '../components/Customers/Customers' 
import Billing from './Billing/BillContainer'
import Products from '../components/Products/Products'
import DashBorad from './Dashboard'


const NavBar = (props) => {

    const {userLoggedIn, handleAuth} = props 

    return (
        <Container>
            
                <Link to = '/' > <Button 
                                    variant="contained" 
                                    color="primary"
                                >Home</Button></Link> 

                { userLoggedIn ?( 
                    <> 
                        
                                <Link to = '/dashboard' ><Button variant="contained" color="primary" >Dashboard</Button></Link> 
                                <Link to = "/customers" ><Button variant="contained" color="primary" >Customers</Button></Link>
                                <Link to = "/products" ><Button variant="contained" color="primary" >Products</Button></Link>
                                <Link to = "/billing" ><Button variant="contained" color="primary" >Billing</Button></Link>
                                <Link to = "/profile" ><Button variant="contained" color="primary" >Profile</Button></Link>
                                <Link to = "/" onClick= {() => {
                                    localStorage.removeItem('token')
                                    alert("successfully logged out")
                                    handleAuth()
                                    props.history.push('/')
                                }} ><Button variant="contained" color="secondary" size="large" >Logout</Button> </Link>
                        
                            
                     </>
                ) : (
                    <>
                    <Link to = "/register">  <Button 
                                    variant="contained" 
                                    color="primary"
                                >Register</Button> </Link>
                    <Link to = "/login" ><Button 
                                    variant="contained" 
                                    color="primary"
                                >login</Button></Link>
                    </>
                )}
            


                <Route path = '/' component={Home} exact = {true} />
                <Route path = '/dashboard' component={DashBorad} exact = {true} />
                <Route path = '/customers' component = {Customers} />
                <Route path = '/products' component = {Products} />
                <Route path = '/billing' component = {Billing} />
                <Route path = '/profile' component = {Profile} />
                <Route path = '/register' component = {Register} />
                <Route path = '/login' render = {(props) => {
                    return <Login 
                                {...props}
                                handleAuth = {handleAuth}
                            />
                }} />
        </Container>
    )
}

export default withRouter(NavBar)