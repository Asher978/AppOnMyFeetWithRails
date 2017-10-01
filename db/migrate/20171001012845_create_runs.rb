class CreateRuns < ActiveRecord::Migration[5.1]
  def change
    create_table :runs do |t|
      t.date :run_date
      t.integer :miles
      t.string :starting_street1
      t.string :starting_street2
      t.string :staring_city
      t.string :ending_street1
      t.string :ending_street2
      t.string :ending_city
      t.belongs_to :user

      t.timestamps
    end
  end
end
