class AddLatitudeAndLongitudeToModel < ActiveRecord::Migration[5.1]
  def change
    add_column :runs, :latitude, :float
    add_column :runs, :longitude, :float
  end
end
