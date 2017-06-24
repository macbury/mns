require 'spec_helper'

describe 'NodeRSA' do
  let(:pem) { File.read(Rails.root.join('spec', 'fixtures', 'mns.test.rsa')) }
  let(:encrypted_content) { File.read(Rails.root.join('spec', 'fixtures', 'test.enc')) }
  let(:private_key) { OpenSSL::PKey::RSA.new(pem) }

  it 'load generated pem in ruby' do
    expect { private_key }.not_to raise_exception
  end

  describe 'decryption' do
    subject { private_key.private_decrypt(encrypted_content, OpenSSL::PKey::RSA::PKCS1_OAEP_PADDING) }
    let(:json_subject) { JSON.parse(subject) }
    it { expect { subject }.not_to raise_exception }
    it { expect { json_subject }.not_to raise_exception }
    it { expect(json_subject).not_to be_empty }
  end
end
