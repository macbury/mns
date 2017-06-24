class VaultRepo
  def self.all
    Vault.order('name')
  end

  def self.fetch(id)
    Vault.find_by!(name: id)
  end

  def self.build(attrs={})
    Vault.new(attrs)
  end

  def self.create(attrs)
    record = build(attrs)
    record.save
    record
  end
end
