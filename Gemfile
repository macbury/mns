source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.1'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
gem 'config'
gem 'haml-rails'
gem 'pry-rails'
gem 'simple_form'
gem 'bootstrap-sass', '~> 3.3.6'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'attr_encrypted', '~> 3.0.0'
gem 'rack-attack'
gem 'devise'
gem 'omniauth'
gem 'omniauth-google-oauth2'
gem 'google-api-client'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'fabrication'
  gem 'guard-rspec', require: false
  gem 'foreman', require: false
end

group :test do
  gem 'database_rewinder'
  gem 'rspec-json_matchers'
  gem 'rspec-rails'
  gem 'shoulda'
  gem 'timecop'
end
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
