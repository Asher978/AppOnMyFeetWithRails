class AddColumnsToRuns < ActiveRecord::Migration[5.1]
  def change
    add_column :runs, :starting_point, :string
    add_column :runs, :ending_point, :string
  end
end
