import {reactLocalStorage} from 'reactjs-localstorage';
import {User} from '../core/core.services.user.js';;

export class FacebookInit {
	
	static init(){
		window.fbAsyncInit = function() {
		    window.FB.init({
		      appId      : '1806013226357069', //'<YOUR_APP_ID>',
		      cookie     : true,  // enable cookies to allow the server to access
		                        // the session
		      xfbml      : true,  // parse social plugins on this page
		      version    : 'v2.1' // use version 2.1
		    });

		    window.FB.getLoginStatus(function(response) {
		    });
		  };

		  // Load the SDK asynchronously
		  (function(d, s, id) {
		    var js, fjs = d.getElementsByTagName(s)[0];
		    if (d.getElementById(id)) return;
		    js = d.createElement(s); js.id = id;
		    js.src = "//connect.facebook.net/en_US/sdk.js";
		    fjs.parentNode.insertBefore(js, fjs);
		  }(document, 'script', 'facebook-jssdk'));

	};

	static testAPI() {
	  console.log('Welcome!  Fetching your information.... ');
	  window.FB.api('/me', function(response) {
	  console.log('Successful login for: ' , response);
	  });
	}

	// This is called with the results from from FB.getLoginStatus().
	static statusChangeCallback(response) {
		if (response.status === 'connected') {		    
		    FacebookInit.testAPI();
		} else if (response.status === 'not_authorized') {
		    // The person is logged into Facebook, but not your app.
		} else {
		    // The person is not logged into Facebook, so we're not sure if
		    // they are logged into this app or not.
		}
	}

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	static checkLoginState() {
	  window.FB.getLoginStatus(function(response) {
	    FacebookInit.statusChangeCallback(response);
	    User.saveFacebookToken(response, function(){
	  				window.location = "/home";
	  			});
	  });
	}

	static login() {	
	  window.FB.login(function(){
	  	FacebookInit.checkLoginState();
	  }, {scope: 'user_photos'});
	}

	static logOut(){
			window.FB.logout(function(response) {
	  			reactLocalStorage.setObject('hasToken', false);
	  			reactLocalStorage.setObject('userToken',{});
	  			User.saveFacebookToken("", function(){
	  				window.location = "/home";
	  			});
	  		});
		}
	
}

