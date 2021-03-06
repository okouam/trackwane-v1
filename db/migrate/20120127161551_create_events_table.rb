class CreateEventsTable < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :device
      t.integer :status_code
      t.point :lonlat, :srid => 4326, :null => false
      t.decimal :speed
      t.string :address
      t.decimal :heading
      t.boolean :gps_signal
      t.references :place
      t.integer :previous_event_id
      t.datetime :date
      t.geometry :point
      t.decimal :distance_delta
    end
  end
end
