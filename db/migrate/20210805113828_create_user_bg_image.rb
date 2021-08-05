class CreateUserBgImage < ActiveRecord::Migration[6.1]
  def change
    create_table :user_bg_images do |t|
      t.references :background
      t.references :user
      t.timestamps null: false
    end
  end
end
