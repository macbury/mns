Fabricator(:vault_archive) do
  encrypted_files    "MyText"
  encrypted_files_iv "MyString"
  vault_id           1
end
