class ChangeRundataCoulmn < ActiveRecord::Migration[5.1]
  def change
    remove_column :trackruns, :rundata, :jsonb
    add_column :trackruns, :rundata, :float, :array => true, :default => []
  end
end
