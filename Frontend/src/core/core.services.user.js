import $ from 'jquery';
import {reactLocalStorage} from 'reactjs-localstorage';

export class User {

	static storeToken(request){
		var header = {};
		header['access-token'] = request.getResponseHeader('access-token');
		header['expiry'] = request.getResponseHeader('expiry');
		header['token-type'] = request.getResponseHeader('token-type');
		header['uid'] = request.getResponseHeader('uid');
		header['client'] = request.getResponseHeader('client');
	  
	  reactLocalStorage.setObject('userKeys', header);
	}

	static logout(data, onSuccessCallback){
		$.ajax({
	      url: 'http://localhost:3000/api/',
	      method: 'POST',
	      dataType: 'json',
	      data: data,
	      
	      success: function(response, textStatus, request) {	      	
	        alert('You have been registred successfuly !');

	        if (typeof onSuccessCallback == "function")
          	onSuccessCallback.apply(null, arguments);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.log("Error : ", err);
	      }.bind(this)
	    });
	}

	static login(data, onSuccessCallback){
		$.ajax({
	      url: 'http://localhost:3000/api/sign_in/',
	      method: 'POST',
	      dataType: 'json',
	      data: data,
	      
	      success: function(response, textStatus, request) {
	      	User.storeToken(request);

	        reactLocalStorage.setObject('userInfo', response.data);
	       	
	       	if (response.data.facebook_token){
	       		reactLocalStorage.setObject('hasToken', true);	       		
	       	}
	       	else{
	       		reactLocalStorage.setObject('hasToken', false); 	       		
	       	}

	       	
	        if (typeof onSuccessCallback == "function")
          	onSuccessCallback.apply(null, arguments);

	      }.bind(this),
	      error: function(xhr, status, err) {
	      	alert('This combination of email and password doesn\'t exist');
	      }.bind(this)
	    });
	}

	static saveFacebookToken(response, onSuccessCallback){
		var data = {};
		data.facebook_token = response;
		$.ajax({
      url: 'http://localhost:3000/api/facebookToken',
      method: 'POST',
      dataType: 'json',
      headers: 	
      { 'access-token': reactLocalStorage.getObject('userKeys')['access-token'] ,
	      'expiry' : reactLocalStorage.getObject('userKeys')['expiry'],
	      'token-type' : reactLocalStorage.getObject('userKeys')['token-type'],
	      'uid': reactLocalStorage.getObject('userKeys')['uid'],
	      'client': reactLocalStorage.getObject('userKeys')['client'] 
			},
      data: data,
      
      success: function(response, textStatus, request) {

      	User.storeToken(request);

        reactLocalStorage.setObject('userInfo', response.user);

        if (response.user.facebook_token){
        	reactLocalStorage.setObject('hasToken', true);
        }
        else {
        	reactLocalStorage.setObject('hasToken', false);
        }

        if (typeof onSuccessCallback == "function")
      		onSuccessCallback.apply(null, arguments);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error : ", err);
      }.bind(this)
    });
	}

}