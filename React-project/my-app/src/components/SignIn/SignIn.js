import React from 'react';
import $ from 'jquery';
import {reactLocalStorage} from 'reactjs-localstorage';
import {User} from '../../core/core.services.user.js';
import './SignIn.css';

class SignIn extends React.Component {

	constructor(props){
	  super(props);
	  
	  this.state={
		  email: '',
		  password: '',
	  }
	  reactLocalStorage.setObject('userKeys', {});
	  reactLocalStorage.setObject('userInfo', {});
	  reactLocalStorage.setObject('hasToken', false);	  

	  this.handleClick = this.handleClick.bind(this);
	 }


	render(){
		return (
			<div className="sign-in-form common-form">
				<h3>Sign In </h3>
				<label className="form-item form-label">Email adress</label>
				<input className="form-item form-input" type="email" name="email" placeholder="email adress" 
				onChange={(event) => this.setState({email: event.target.value}) }/>
				<label className="form-item form-label">password</label>
				<input className="form-item form-input" type="password" name="password" placeholder="password" 
				onChange={(event) => this.setState({password: event.target.value}) }/>
				<button onClick={this.handleClick}> Submit </button>
				<div className="register-btn"><a href="/register">Create a new account</a></div>
			</div>
			)
	}

	handleClick(event){
		var self = this;
		if (!this.state.email || !this.state.password ){
			alert('Email and password : required');
			return;
		}
		var data={
		    "email":this.state.email,
		    "password": this.state.password,
		}
		User.login(data, function(){
			window.location = "/home";
		});
	}
}

export default SignIn;