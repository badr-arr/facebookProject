class UpdateColumnTypeFacebookToken < ActiveRecord::Migration
  def change
  	change_column :users, :facebook_token, :json
  end
end
