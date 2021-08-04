class AddNameToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :username_first, :string
    add_column :users, :username_middle, :string
    add_column :users, :username_last, :string
  end
end
