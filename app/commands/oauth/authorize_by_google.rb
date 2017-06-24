module Oauth
  class AuthorizeByGoogle < BaseCommand
    attr_reader :oauth_info

    def call
      User.find_or_initialize_by(email: email, provider: provider).tap do |user|
        user.refresh_token = refresh_token if refresh_token
        logger.error 'Cannot create user: ' + user.errors.full_messages.join(', ') unless user.save
      end
    end

    private

    def provider
      oauth_info['provider']
    end

    def email
      oauth_info['info']['email']
    end

    def refresh_token
      oauth_info['credentials']['refresh_token']
    end

    def initialize(oauth_info)
      @oauth_info = oauth_info
    end
  end
end
