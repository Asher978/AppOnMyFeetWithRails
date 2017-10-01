class CreateRuns < ActiveRecord::Migration[5.1]
  def change
    create_table :runs do |t|

      t.timestamps
    end
  end
end
