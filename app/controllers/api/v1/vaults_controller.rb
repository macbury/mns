module Api
  module V1
    class VaultsController < ApiController
      before_action :verify_user

      def show
        @vault = VaultRepo.fetch(id_param)
        send_data Vaults::FetchFiles.call(@vault, timestamp_param),
                  type: 'application/octet-stream',
                  disposition: 'attachment',
                  filename: "#{@vault.name}.tar.enc"
      end

      private

      def verify_user
        render status: :unauthorized, json: { error: 'Verification failure' } unless Users::Verify.call(deploy_user)
      end

      def deploy_user
        @deploy_user ||= User.find_by!(deploy_token: deploy_token_param)
      end

      def timestamp_param
        params[:timestamp]
      end

      def deploy_token_param
        params.require(:deploy_token)
      end
    end
  end
end
