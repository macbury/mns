class CreateVaults < ActiveRecord::Migration[5.1]
  def change
    create_table :vaults, id: :uuid do |t|
      t.string :name, null: false, index: true
      t.text :encrypted_files, null: false
      t.text :encrypted_files_iv, null: false

      t.timestamps
    end
  end
end
