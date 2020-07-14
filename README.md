### Getting Started

# To log into firebase, run `firebase init` and follow these instructions: 

1. Select all CLI features except Firestore.
1. Use database.rules.json. Do NOT overwrite this.
1. Use JavaScript
1. Do not use ESLint.
1. Do not overwrite functions/package.json.
1. Do not overwrite functions/index.js.
1. Do not overwrite functions/.gitignore.
1. Do install npm dependencies right now.
1. Use public as the public directory.
1. DO rewrite all urls to index.html.
1. Do NOT overwrite public/index.html.
1. Use storage.rules for storage rules.
1. Set up functions, database, and hosting emulators.
1. Press enter 6 times.

Run `npm install` to install all required dependencies if not already installed. IMPORTANT - this, and all other `npm` commands may change in the future to `yarn install` if we switch due to build problems.

Refer to [this documentation](https://firebase.google.com/docs/functions/config-env) to set up environment variables with our API keys.

Run `firebase emulators:start --only functions` to start the functions emulator that allows for API calls and email sending functionality
in our app.

**Note: if the above throws an error with functions.config() being null, run this: `firebase functions:config:get > .runtimeconfig.json`**

Run `npm start` to start the project - navigate to localhost:3000.


### Deployment

Make sure you're using the correct project (stint-landing, which is production, or stint-staging-eb100, which is for development).
To switch beween the two, do `firebase use stint-landing` or `firebase use stint-staging-eb100`.

Run `npm build` in the src folder.

Run `firebase deploy` to deploy to prod. **IMPORTANT: Do NOT firebase deploy if on stint-landing unless you have tested ALL changes
after deploying to stint-staging-eb100**. If deploy does not work, try `yarn build` instead of `npm build` and deploy again.
