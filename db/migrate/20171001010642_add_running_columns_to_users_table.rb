class AddRunningColumnsToUsersTable < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :half_marathons, :int
    add_column :users, :full_marathons, :int
    add_column :users, :total_miles, :int
    add_column :users, :picture, :string
    add_column :users, :admin, :boolean, :default => false
  end
end
