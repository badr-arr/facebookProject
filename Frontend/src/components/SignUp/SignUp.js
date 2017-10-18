import React from 'react';
import $ from 'jquery';
import {User} from '../../core/core.services.user.js';
import './SignUp.css';

class SignUp extends React.Component {

	constructor(props){
	  super(props);
	  
	  this.state={
		  email: '',
		  password: '',
		  password_confirmation: ''
	  }

	  this.Register = this.Register.bind(this);
	 }


	render(){
		return (
			<div className="sign-up-form common-form">
				<h3>Sign up</h3>
				<label className="form-item form-label">Email adress :</label>
				<input className="form-item form-input" type="email" name="email" placeholder="email adress" 
				onChange={(event) => this.setState({email: event.target.value}) }/>
				<label className="form-item form-label">password :</label>
				<input className="form-item form-input" type="password" name="password" placeholder="password" 
				onChange={(event) => this.setState({password: event.target.value}) }/>
				<label className="form-item form-label">password confirmation :</label>
				<input className="form-item form-input" type="password" name="password_confirmation" placeholder="password confirmation" 
				onChange={(event) => this.setState({password_confirmation: event.target.value}) }/>
				<button onClick={this.Register}> Register </button>
				<div className="sign-in-btn"><a href="/">Login to an existant account</a></div>
			</div>
			)
	}

	Register(event){
		if (!this.state.email || !this.state.password || !this.state.password_confirmation){
			alert('Email, password and password confirmation : Required');
			return;
		}
		if ( this.state.password != this.state.password_confirmation ){
			alert('Password and password confirmation must be identical.');
			return;
		}

		var self = this;
		
		var data={
		    "email":this.state.email,
		    "password": this.state.password,
		    "password_confirmation": this.state.password_confirmation
		}

		User.logout(data, function(){
			window.location = "/";
		})
	}
}

export default SignUp;