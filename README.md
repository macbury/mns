# About

Simple secure configuration store. Each file is encrypted on browser side using AES 256 and stored
on the server. Only users with proper access token can download encrypted content. Encryption key is generated on browser side
and its never hits server

## Setup

* Create configuration for your current environment in `app/config/environments/[environment].yml`
  * Set up database credentials
  * Set up page name
  * Create and fill in Google OAuth 2.0 Credentials at console.developers.google.com/apis/credentials/oauthclient
* Run app locally with `foreman start -f Procfile`
* In development app runs on `http://localhost:5000`

### Creating OAuth credentials

* You need to set authorized callback URL to the full URL for `/users/auth/google_oauth2/callback`, e.g. `http://localhost:5000/users/auth/google_oauth2/callback` in development.
* Remember to enable Google+ API for the OAuth client or the app will fail silently.

## Usage

Create vault with name for example test. Now you can download all encrypted stuff as encrypted tar and decompress them using simple command:

``` bash
curl -s http://localhost:5000/api/v1/vaults/test | openssl enc -d -aes-256-cbc -md sha512 -kfile mns.test.key | tar xv -C dest/
```

## Example flow
https://www.youtube.com/watch?v=3OKzJ0ipuAM
