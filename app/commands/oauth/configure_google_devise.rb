module Oauth
  class ConfigureGoogleDevise < BaseCommand
    attr_reader :devise, :settings
    delegate :client_id, :client_secret, :allowed_domain, to: :settings

    def call
      devise.omniauth :google_oauth2, client_id, client_secret,
                      hd: allowed_domain,
                      scope: %w(email profile).join(','),
                      access_type: 'offline',
                      prompt: :select_account
    end

    private

    def initialize(devise)
      @devise = devise
      @settings = Settings.google
    end
  end
end
