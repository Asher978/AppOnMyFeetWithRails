class RenameColumnRunsTable < ActiveRecord::Migration[5.1]
  def change
    rename_column :runs, :staring_city, :starting_city
  end
end
