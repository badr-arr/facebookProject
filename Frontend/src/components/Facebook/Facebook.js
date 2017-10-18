import React from 'react';
import $ from 'jquery';
import {reactLocalStorage} from 'reactjs-localstorage';
import {FacebookInit} from '../../core/core.facebook.js';
import './Facebook.css';

class Facebook extends React.Component {
	constructor (props){
	  super(props);

	    this.state = {
	    	FB_user_info: {},
	    	FB_login_is_visible: true,
	    }
	  
	  if (reactLocalStorage.getObject('tokenIsValid'))
	  	this.state.FB_login_is_visible = true;
	  else
	  	this.state.FB_login_is_visible = false;

	  this.componentDidMount = this.componentDidMount.bind(this);
	}


	componentDidMount() {
		FacebookInit.init();
	}

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	

	render(){
		return (
			<div className="Facebook">
				<div id="status"></div>
				<a href="#" onClick={FacebookInit.login}>Connect with facebook</a>
			</div>
			)
	}
}

export default Facebook;

