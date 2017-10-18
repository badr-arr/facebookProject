import React from 'react';
import $ from 'jquery';
import { FacebookInit } from '../../core/core.facebook.js';
import { User } from '../../core/core.services.user.js';
import {reactLocalStorage} from 'reactjs-localstorage';
import './Albums.css';

class Albums extends React.Component {
	constructor (props){
  		super(props);

	    this.state = {
	    	albums: [],
	    }

	    this.state.albums.show_photos = false;
	  	this.getAllPhotosOfAlbum = this.getAllPhotosOfAlbum.bind(this);
	  	this.getAllAlbums = this.getAllAlbums.bind(this);

	}

	componentDidMount() {
		FacebookInit.init();
	}

	getAllPhotosOfAlbum(album, url){
		var fb_token = JSON.parse(reactLocalStorage.getObject('userInfo').facebook_token);
		var self = this;
		if (!url)
			url = '/'+album.id+'/photos';
		window.FB.api(url, function(response) {
			response.data.forEach(function(photo){
				photo.url = "https://graph.facebook.com/"+ photo.id+"/picture?access_token="+fb_token.authResponse.accessToken;
				album.photos.push(photo);
			});
			console.log(album);
			if (response.paging){
				var next_url = '/'+album.id+'/photos?after='+response.paging.cursors.after;
				self.getAllPhotosOfAlbum(album,next_url);
			}
		})

	}

	getAllAlbums(url){
		var self = this;
		var fb_token = JSON.parse(reactLocalStorage.getObject('userInfo').facebook_token);
		if (!url){
			url = '/'+fb_token.authResponse.userID+'/albums?fields=id,name,cover_photo';
		}
		window.FB.api(url, function(response) {
			if (response.error){
				alert('Your current session has expired. Please login again');
				User.saveFacebookToken("", function(){
					window.location = "/home";
				});
				return;
			}
			var albums = self.state.albums;
			albums.show_photos = true;
			response.data.forEach(function(album){
				album.photos = [];
				self.getAllPhotosOfAlbum(album);
				if (album.cover_photo){
					album.has_photos = true;
					album.url = "https://graph.facebook.com/"+ album.cover_photo.id+"/picture?access_token="+fb_token.authResponse.accessToken;
				}
				else {
					album.has_photos = false;
					album.url = '/empty-album.png';
				}
				albums.push(album);
			});
			if (response.paging){
				url = '/'+fb_token.authResponse.userID+'/albums?fields=id,name,cover_photo&after='+response.paging.cursors.after;
				self.getAllAlbums(url);
			}
			self.setState({ albums });
		});

    };

	render(){
		return (
			<div className="albums">
				{this.state.albums.map(album => 
					<div className="albums-container" key={album.id}>
						<div className="album-header">
							<h1>{album.name}</h1>
							<div className="album-cover" style={{backgroundImage: 'url('+ album.url + ')' }}></div>
						</div>
						{
							album.has_photos ?
							<div className="album-photos">
								<h3>Photos</h3>
								{album.photos.map(photo => <div key={photo.id} className="photos" style={{backgroundImage: 'url('+ photo.url + ')' }}></div> )}
							</div>
							: <div className="empty-content">Cet album est vide.</div>
						}
					</div>
				)}
				{this.state.albums.show_photos ? null : <button className="fetch-btn" onClick={() => {this.getAllAlbums(null)}}>show album of user</button> }
			</div>
			)
	}
}

export default Albums;

	