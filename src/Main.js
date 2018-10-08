import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';


// Containers
import { FkppiLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register, Splash, Forgot } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

class Main extends Component {

 
   renderLoggedOut() {
    return (
      <div>
        <Login />
      </div>
    )
  }


  renderLoggedIn() {

    return (
      <div>

          <FkppiLayout />
      </div>
    )
  }




  render() {
    if (window.localStorage.getItem('Token') === null) {
      return this.renderLoggedOut()
    }else{
       
       return this.renderLoggedIn()

    } 
  }
}

export default Main;
