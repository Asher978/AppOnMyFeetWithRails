class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.integer "full_marathons"
      t.integer "half_marathons"
      t.integer "total_miles"
      t.timestamps
    end
  end
end
