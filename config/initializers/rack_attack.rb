Rack::Attack.cache.store = Rails.cache

Rack::Attack.throttle('req/ip', limit: 60, period: 60.seconds, &:ip)
