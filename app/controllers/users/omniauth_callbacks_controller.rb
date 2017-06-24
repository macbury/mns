module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController

    def google_oauth2
      @user = Oauth::AuthorizeByGoogle.call(omniauth_data)
      respond_with(@user, :google_oauth2)
    end

    def failure
      redirect_to new_user_session_path
    end

    private

    def respond_with(user, kind)
      if user.persisted?
        sign_in_and_redirect user, event: :authentication
        set_flash_message(:notice, :success, kind: kind) if is_navigational_format?
      else
        set_flash_message(:notice, :error, kind: kind) if is_navigational_format?
        redirect_to root_path
      end
    end

    def omniauth_data
      request.env['omniauth.auth']
    end
  end
end
