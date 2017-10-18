import React from 'react';
import $ from 'jquery';
import Facebook from '../Facebook/Facebook.js';
import Albums from '../Albums/Albums.js';
import {reactLocalStorage} from 'reactjs-localstorage';
import './Home.css';

class Home extends React.Component {
	constructor(props){
		super(props);
	}

	logOut (){
		reactLocalStorage.setObject('userKeys', {});
		window.location = '/';
	}

	render(){
		return (
			<div className="home">
				<h3>Home</h3>
				<button className="logout-btn" onClick={this.logOut}>Log out</button>
				{
					!reactLocalStorage.getObject("hasToken") ? <Facebook /> : <Albums />
				}
			</div>
			)
	}
}

export default Home;