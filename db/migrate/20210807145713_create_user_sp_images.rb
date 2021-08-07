class CreateUserSpImages < ActiveRecord::Migration[6.1]
  def change
    create_table :user_sp_images do |t|
      t.references :record
      t.references :user
      t.timestamps null: false
    end
  end
end
