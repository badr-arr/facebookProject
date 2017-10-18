class Api::UsersController < ApplicationController
	before_action :authenticate_user!

	def test
		render json: {message: params}
	end


	def create
		result = User.sign_up(params)
	    render(result)
	end

	def sign_in
		result = User.sign_in(params)
	    render(result)
	end

	def logout
		result = @user.logout
	    render(result)	
	end

	def save_facebook_token
		user = User.find_by(id: current_user.id)		
		if params[:facebook_token].empty?			
			user.update(facebook_token: nil)
		else
	    	user.update(facebook_token: params[:facebook_token].to_json)
	    end
	    user.save
	    render json: {user: user}
	end


end
