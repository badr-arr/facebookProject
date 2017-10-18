module Overrides
	class RegistrationsController < DeviseTokenAuth::RegistrationsController
		
		protected

		def render_create_success
			if @resource
				@resource.facebook_token = nil
				@resource.save!
			end
			render json: {
			       status: 'success',
			       data:   resource_data
			     }
		end

	end
end