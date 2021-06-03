import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App'
import configureStore from './store/configureStore'
//import {StartRegisterUsers} from './actions/usersAction'

const store=configureStore()
//console.log(store)


  //console.log('state',store.getState()


 // store.subscribe(()=>{
  //  console.log('state updated',store.getState())
 // })

  //store.dispatch(StartRegisterUsers())

ReactDOM.render(
  < Provider store={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
      
   
  </Provider>
  , document.getElementById('root')
)

  