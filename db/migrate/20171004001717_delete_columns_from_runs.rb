class DeleteColumnsFromRuns < ActiveRecord::Migration[5.1]
  def change
    remove_column :runs, :starting_street1
    remove_column :runs, :starting_street2
    remove_column :runs, :ending_street1
    remove_column :runs, :ending_street2
  end
end
