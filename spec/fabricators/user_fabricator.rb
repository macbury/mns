Fabricator(:user) do
  email { sequence(:email) { |i| "email#{i}@test.local" } }
  refresh_token 'random-token'
end
