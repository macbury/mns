class VaultsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @vaults = VaultRepo.all
  end

  def new
    @vault = VaultRepo.build
  end

  def create
    @vault = VaultRepo.create(create_vault_params)
    if @vault.persisted?
      render status: :created, json: { redirect_to: vault_path(@vault) }
    else
      render status: :unprocessable_entity, json: { errors: @vault.errors }
    end
  end

  def update
    @vault = VaultRepo.fetch(id_param)
    if @vault.update_attributes(update_vault_params)
      render status: :created, json: {}
    else
      render status: :unprocessable_entity, json: { errors: @vault.errors }
    end
  end

  def show
    @vault = VaultRepo.fetch(id_param)
    respond_to do |format|
      format.html
      format.json { render json: { name: @vault.name, files: @vault.files } }
    end
  end

  private

  def id_param
    params.require(:id)
  end

  def create_vault_params
    params.require(:vault).permit(:name, :files)
  end

  def update_vault_params
    params.require(:vault).permit(:files)
  end
end
