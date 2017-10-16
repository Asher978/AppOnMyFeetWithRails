class CreateTrackruns < ActiveRecord::Migration[5.1]
  def change
    create_table :trackruns do |t|
      t.float :rundata, array:true, default: []
      t.timestamps
    end
  end
end
