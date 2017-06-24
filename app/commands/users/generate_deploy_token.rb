module Users
  class GenerateDeployToken < BaseCommand
    attr_reader :user

    def call
      loop do
        user.deploy_token = SecureRandom.hex(16)
        break unless User.exists?(deploy_token: user.deploy_token)
      end

      user
    end

    private

    def initialize(user)
      @user = user
    end
  end
end
