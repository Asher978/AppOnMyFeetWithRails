# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171015143246) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "profiles", force: :cascade do |t|
    t.integer "full_marathons"
    t.integer "half_marathons"
    t.integer "total_miles"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "picture"
  end

  create_table "runs", force: :cascade do |t|
    t.date "run_date"
    t.integer "miles"
    t.string "starting_city"
    t.string "ending_city"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "latitude"
    t.float "longitude"
    t.string "starting_point"
    t.string "ending_point"
    t.index ["user_id"], name: "index_runs_on_user_id"
  end

  create_table "trackruns", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.json "rundata", default: []
    t.index ["user_id"], name: "index_trackruns_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "firstname"
    t.string "lastname"
    t.string "password_digest"
    t.string "email"
    t.string "auth_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.index ["username"], name: "index_users_on_username"
  end

  add_foreign_key "trackruns", "users"
end
