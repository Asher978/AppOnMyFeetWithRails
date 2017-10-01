class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, index: true
      t.string :firstname
      t.string :lastname
      t.string :password_digest
      t.string :email
      t.string :auth_token

      t.timestamps
    end
  end
end
