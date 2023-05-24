class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :publisher
      t.integer :price
      t.string :image_url
      t.integer :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
