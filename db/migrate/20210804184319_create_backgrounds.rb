class CreateBackgrounds < ActiveRecord::Migration[6.1]
  def change
    create_table :backgrounds do |t|
      t.string :bg_name
      t.string :bg_image
      t.references :user
      t.timestamps null: false
    end
  end
end
