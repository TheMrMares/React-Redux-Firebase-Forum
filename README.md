# React Firebase Forum

## How to use

### Firebase config
To use project you have to change firebase config variables for you own. In file /firebase/inex.js you can see process.env.VAR variables related to config properties. Change them to your own, physically in that file or create .env file and put your own values there but with attention to .env variables names that you can check in /firebase/index.js.

**Example:**
```
REACT_APP_API_KEY="api key here"
REACT_APP_AUTH_DOMAIN="domain here"
REACT_APP_DATABASE_URL="database url here"
REACT_APP_PROJECT_ID="project id here"
REACT_APP_STORAGE_BUCKET="storage bucket here"
REACT_APP_SENDER_ID="sender id here"
```