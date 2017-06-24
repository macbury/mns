# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)

abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'fabrication'
require 'rspec/rails'
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

ActiveRecord::Migration.maintain_test_schema!


RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = false

  config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!

  config.filter_run_including :focus
  config.filter_run_excluding broken: true
  config.run_all_when_everything_filtered = true
  config.order = :random

  config.before(:suite) do
    DatabaseRewinder.clean_all
  end

  config.before(:each) do
    DatabaseRewinder.clean
  end
end
