module Users
  class Verify < BaseCommand
    attr_reader :user

    def call
      !user.access_locked? && google_access?
    end

    private

    def initialize(user)
      @user = user
    end

    def google_access?
      Oauth::FetchAccessToken.call(user.refresh_token)
    end
  end
end
