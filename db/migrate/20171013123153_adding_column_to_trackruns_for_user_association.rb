class AddingColumnToTrackrunsForUserAssociation < ActiveRecord::Migration[5.1]
  def change
    add_reference :trackruns, :user, foreign_key: true 
  end
end
