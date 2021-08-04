class CreateMissions < ActiveRecord::Migration[6.1]
  def change
    create_table :missions do |t|
      t.references :user
      t.string :content
      t.boolean :completed
      t.timestamps null: false
    end
  end
end
