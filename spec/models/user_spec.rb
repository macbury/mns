describe User, type: :model do
  describe 'db columns' do
    it { is_expected.to have_db_column(:email).of_type(:string).with_options(null: false) }
    it { is_expected.to have_db_column(:refresh_token).of_type(:string) }
    it { is_expected.to have_db_column(:deploy_token).of_type(:string) }
  end

  describe 'new object' do
    subject { Fabricate(:user) }

    it 'have random unique deploy token after create' do
      expect(subject.deploy_token).not_to be_nil
    end
  end
end
