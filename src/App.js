import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';


import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { FkppiLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register, Splash, Forgot } from './views/Pages';

import Main from './Main'

// import NewsStore from './stores/news.store';

// import { renderRoutes } from 'react-router-config';


// const stores = {
//   NewsStore
// };



class App extends Component {
  render() {
    return (
      // <Provider {...stores}>
        <BrowserRouter>
          <div>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/change-password" name="Forgot Page" component={Forgot} />
            <Route exact path="/splash" name="Splash Page" component={Splash} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" component={Main} />
         </div>
        </BrowserRouter>
      //{ </Provider> }
    );
  }
}

export default App;
