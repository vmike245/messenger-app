# Messenger App

An application that allows you to exchange messages with others
An example page is hosted at: https://guild-messenger-app.herokuapp.com/

# Getting Started
## Prerequisites
* NodeJS version 8.0.0 or later
* NPM version 5.6.0 or later

## Install
Run the following commands to get started
```bash
git clone https://github.com/vmike245/messenger-app.git
cd messenger-app
npm install
```

## Building the code
Run the following command to build the application
```bash
npm run build
```

## Running the program
To start up the web server run
```bash
npm run start-server
```
Navigate to `http://localhost:3000` to view the application

# Assumptions
The conversation is held in memory. So if the server stops then the conversation history is lost.

# Future work
* Right now the conversation updates using a 2 second polling interval. Ideally the conversation would update using a server side push. That way there wouldn't be a set waiting period to retrieve the new messages.
* There is only a concept of a single "chat room" so any user who navigates the URL will be able to participate in the conversation. This could be improved on by allowing for individual conversations.
* There aren't any tests. The server side code is fairly simple, so it would benefit the most from integration style tests to make sure that the endpoints continue to work as expected. The front end code could use some tests around the components to make sure they are rendering properly given a specific set of parameters.
* It would be nice to allow users to pick their usernames, in an easier way than editing local storage. That would involve a bit more work because we would want to make sure that users cannot impersonate other users, so we would need some kind of authentication
* We are retrieving all messages from the server at all times. It would be better to send a header like "If-Modified-Since" so that the API doesn't need to send back a large array and the UI knows that it can update any time it receives more than 0 messages