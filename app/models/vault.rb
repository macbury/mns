class Vault < ApplicationRecord
  NAME_FORMAT = /[a-zA-Z0-9\-\.]+/
  validates :name, presence: true, uniqueness: true, format: { with: NAME_FORMAT }
  validates :files, presence: true

  attribute :files
  attr_encrypted :files, key: proc { Settings.database_encryption_key }

  has_many :archives, dependent: :delete_all, class_name: 'VaultArchive'

  before_update :prepare_archive

  def to_param
    name
  end

  private

  def prepare_archive
    archives.new(files: files_was) if files_changed?
  end
end
