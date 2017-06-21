class CreateGrids < ActiveRecord::Migration[5.1]
  def change
    create_table :grids do |t|
      t.string, :name
      t.integer :power

      t.timestamps
    end
  end
end
