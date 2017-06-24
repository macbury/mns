# frozen_string_literal: true
class BaseCommand
  def call
    throw 'Implement call method'
  end

  def logger
    Rails.logger
  end

  def self.call(*args)
    new(*args).call
  end
end
