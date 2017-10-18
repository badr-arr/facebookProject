import React, { Component } from 'react';
import logo from './logo.svg';
import {reactLocalStorage} from 'reactjs-localstorage';
import SignIn from './components/SignIn/SignIn.js';
import SignUp from './components/SignUp/SignUp.js';
import Home from './components/Home/Home.js';
import './App.css';

var createReactClass = require('create-react-class');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;


class App extends Component {
  
  constructor(props){
    super(props);
    
    this.state={
      isLoggedIn: false
    }    
    this.protectedRoute = this.protectedRoute.bind(this);
   }

  protectedRoute(){
    this.state.isLoggedIn = (Object.keys(reactLocalStorage.getObject('userKeys')).length === 0) ? false : true;
    if (this.state.isLoggedIn){      
      return <Home />;
    }
    else {
      return <SignIn />;
    }
  }

  render() {
    return (
    	<Router>
    		<div className="container">
    			<Route exact path='/' component={this.protectedRoute}   />
        		<Route exact path='/register' component={SignUp} />
        		<Route exact path='/home' component={this.protectedRoute}/>            
      		</div>
    	</Router>
    );
  }
}

export default App;
