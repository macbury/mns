module Vaults
  class FetchFiles < BaseCommand
    attr_reader :vault

    def call
      Base64.decode64(files)
    end

    private

    def initialize(vault, timestamp)
      @vault = vault
      @timestamp = timestamp
    end

    def files
      if archive
        logger.info "Loading files from archive for #{archive.created_at}"
        archive.files
      else
        logger.info 'Loading newest files'
        vault.files
      end
    end

    def archive
      @archive ||= vault.archives.where('created_at >= :timestamp', timestamp: timestamp).first
    end

    def timestamp
      DateTime.parse(@timestamp)
    rescue
      Time.zone.now
    end
  end
end
