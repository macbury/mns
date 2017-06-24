require 'google/api_client/client_secrets'

module Oauth
  class FetchAccessToken < BaseCommand
    attr_reader :refresh_token

    def call
      return unless auth_info
      auth_info['access_token']
    rescue Signet::AuthorizationError => auth_error
      logger.error auth_error
      false
    end

    private

    def initialize(refresh_token)
      @refresh_token = refresh_token
    end

    def auth_info
      @auth_info ||= authorization.refresh!
    end

    def authorization
      @authorization ||= Google::APIClient::ClientSecrets.new(options).to_authorization
    end

    def options
      {
        web: {
          client_id: Settings.google.client_id,
          client_secret: Settings.google.client_secret,
          refresh_token: refresh_token
        }
      }
    end
  end
end
