# About

Simple secure configuration store. Each file is encrypted on browser side using AES 256 and stored
on the server. Only users with proper access token can download encrypted content. Encryption key is generated on browser side
and its never hits server

## Usage

Create vault with name for example test. Now you can download all encrypted stuff as encrypted tar and decompress them using simple command:

``` bash
curl -s http://localhost:5000/api/v1/vaults/test | openssl enc -d -aes-256-cbc -md sha512 -kfile mns.test.key | tar xv -C dest/
```

## Example flow
https://www.youtube.com/watch?v=3OKzJ0ipuAM
