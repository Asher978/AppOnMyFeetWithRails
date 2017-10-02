class RemoveColumnsFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :half_marathons
    remove_column :users, :full_marathons
    remove_column :users, :total_miles
    remove_column :users, :picture
  end
end
