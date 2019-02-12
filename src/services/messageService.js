const SERVER_PORT = process.env.PORT || 5000;
const SERVER_ADDRESS = process.env.DEV ? `http://localhost:${SERVER_PORT}` : 'https://guild-messenger-app.herokuapp.com';

export const postMessage = ({ message, user }) => {
  return fetch(`${SERVER_ADDRESS}/api/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, message }),
  })
    .then(res => res.json())
    .catch(err => { throw new Error(err) });
};

export const getMessages = () => {
  return fetch(`${SERVER_ADDRESS}/api/messages`)
    .then(res => res.json())
    .catch(err => { throw new Error(err) });
};
