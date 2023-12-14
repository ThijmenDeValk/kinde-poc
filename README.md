# Kinde + Expo bug

A 502 error is thrown when the Kinde SDK makes a call to the Kinde API using a malformed refresh token. This request is made before any legitimate requests are made, so logging in, refreshing the token, etc. all fail.

## Steps to reproduce

1. Run `npm install` and ensure you have all the Expo dependencies installed and configured
2. Add Kinde config in .env file
   - Make sure the IP address matches what Expo Go shows in the console when running `npm start`
3. Run `npm start`
4. Open the iOS simulator by pressing `i`, wait for Expo Go to start
5. After a few seconds, the "Unhandled promise rejection" error will appear in the console
6. Try logging in by pressing the "Login" button
7. The "Unhandled promise rejection" error will appear again

You can press 'J' to open the debug console and see the network request that's returning a 502 error. It looks like this:

```
Request URL: https://{{kinde_url}}/oauth2/token
Request Method: POST
Status Code: 502

Form data:
client_id: {{client_id}}
grant_type: refresh_token
refresh_token: null
```
