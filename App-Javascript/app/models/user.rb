class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable

	include DeviseTokenAuth::Concerns::User
	
    class << self

    		def sign_in(params)
    			binding.pry
    			ActiveRecord::Base.transaction do
    				user = self.find_by(email: params["user"]["email"])
    				if user and user.valid_password?(params["user"]["password"])
    					# auth = Authentication.create_auth(params, user)
    					return Utils.render_json({user: user}, 200)
    			    end
    			    return Utils.render_json({codeError: 4, message: "Email or Password incorrect"}, 403)
    			end
    		end

    		def sign_up(params)
    			binding.pry
    			ActiveRecord::Base.transaction do
    				missing_fields = Utils.check_missing_fields(params, ["email", "password", "password_confirmation" ], "user")
    				return Utils.render_json({codeError: 2, message: "Missing required fields", missing_fileds: missing_fields}, 400) if missing_fields.size > 0
    				
    				if params["password"] != params["password_confirmation"]
    					return Utils.render_json({codeError: 3, message: "password confirmation doesn't match"}, 400) if params["user"]["password"] != params["user"]["password_confirmation"]
    				end
    				user = self.find_by(email: params["user"]["email"])
    				if user
    			    	return Utils.render_json({codeError: 1, message: "Email already exist"}, 403)
    			    else
    			    	user = self.create_user(params)
    	    	    	return Utils.render_json({message: "User created successfully."}, 200)
    			    end
    			end
    		end

    		def create_user(params)
    			user = self.new( 
    								email: params["user"]['email'],
    								password: params["user"]['password'],
    								)
    			user.save
    			user
    		end
    		
    	end

    	def logout
  		self.authentications.destroy_all
  		return result = Utils.render_json({}, 200)
  	end
end
