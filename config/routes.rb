Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  devise_scope :user do
    get 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
    get 'sign_in', to: 'users/sessions#new', as: :new_user_session
  end

  scope defaults: { format: :json } do
    namespace :api do
      namespace :v1 do
        get 'vaults/:id' => 'vaults#show', constraints: { id: Vault::NAME_FORMAT }
      end
    end
  end

  scope constraints: { id: Vault::NAME_FORMAT } do
    resources :vaults
  end

  authenticated :user do
    root to: 'vaults#index', as: :signed_root
  end

  root 'users/sessions#new'
end
