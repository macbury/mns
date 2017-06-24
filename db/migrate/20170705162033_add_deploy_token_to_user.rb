class AddDeployTokenToUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :access_token
    add_column :users, :deploy_token, :string, null: false
    add_index :users, :deploy_token, unique: true
  end
end
