class ChangeRundataColumnType < ActiveRecord::Migration[5.1]
  def change
    remove_column :trackruns, :rundata
    add_column :trackruns, :rundata, :integer, :array => true, :default => []
  end
end
