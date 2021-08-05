# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_05_113828) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "backgrounds", force: :cascade do |t|
    t.string "bg_name"
    t.string "bg_image"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_backgrounds_on_user_id"
  end

  create_table "missions", force: :cascade do |t|
    t.bigint "user_id"
    t.string "content"
    t.boolean "completed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_missions_on_user_id"
  end

  create_table "records", force: :cascade do |t|
    t.string "subject"
    t.float "total_time"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "image"
    t.index ["user_id"], name: "index_records_on_user_id"
  end

  create_table "user_bg_images", force: :cascade do |t|
    t.bigint "bg_name_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bg_name_id"], name: "index_user_bg_images_on_bg_name_id"
    t.index ["user_id"], name: "index_user_bg_images_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "mail"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username_first"
    t.string "username_middle"
    t.string "username_last"
    t.string "chosen_bg"
  end

end
