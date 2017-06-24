class VaultArchive < ApplicationRecord
  validates :files, presence: true
  belongs_to :vault, inverse_of: :archives

  attribute :files
  attr_encrypted :files, key: proc { Settings.database_encryption_key }
end
