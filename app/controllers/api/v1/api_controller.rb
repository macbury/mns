module Api
  module V1
    class ApiController < ActionController::API
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

      private

      def id_param
        params.require(:id)
      end

      def record_not_found(error)
        render json: { error: error.message }, status: :not_found
      end
    end
  end
end
