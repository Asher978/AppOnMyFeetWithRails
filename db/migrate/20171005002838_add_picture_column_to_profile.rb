class AddPictureColumnToProfile < ActiveRecord::Migration[5.1]
  def change
    add_column :profiles, :picture, :string    
  end
end
