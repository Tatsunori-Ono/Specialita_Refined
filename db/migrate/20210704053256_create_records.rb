class CreateRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :records do |t|
      t.string :subject
      t.float :total_time
      t.references :user
      t.timestamps null: false
      t.string :image
    end
  end
end
