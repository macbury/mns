class CreateVaultArchives < ActiveRecord::Migration[5.1]
  def change
    create_table :vault_archives, id: :uuid do |t|
      t.text :encrypted_files
      t.string :encrypted_files_iv
      t.uuid :vault_id, null: false

      t.timestamps
    end
  end
end
