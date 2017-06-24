describe VaultArchive, type: :model do
  describe 'db columns' do
    it { is_expected.to have_db_column(:vault_id).of_type(:uuid).with_options(null: false) }
    it { is_expected.to have_db_column(:encrypted_files).of_type(:text) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:files) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:vault) }
  end
end
