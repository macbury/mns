class User < ApplicationRecord
  devise :lockable, :trackable, :omniauthable, omniauth_providers: [:google_oauth2]
  validates :refresh_token, presence: true
  before_create { Users::GenerateDeployToken.call(self) }
end
