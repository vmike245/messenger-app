import React, { Component } from 'react';
import './App.css';
import { MessageList } from './components/messageList'

const SERVER_ADDRESS = 'http://localhost:5000'

const postMessage = ({ message, user }) => {
  return fetch(`${SERVER_ADDRESS}/api/messages`,
    { method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, message }),
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

const getMessages = () => {
  return fetch(`${SERVER_ADDRESS}/api/messages`)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: '',
      user: '',
    }
    const user = localStorage.getItem('username');
    if (user) {
      this.state.user = user;
    }
    else {
      const newUsername = new Date().valueOf()
      this.state.user = newUsername;
      localStorage.setItem('username', newUsername)
    }
  }

  updateCurrentMessage = (event) => {
    this.setState({
      currentMessage: event.target.value
    })
  }
  sendMessage = (event) => {
    event.preventDefault();
    const { currentMessage, user } = this.state;
    postMessage({ message: currentMessage, user })
      .then(response => this.setState({
        messages: response,
        currentMessage: '',
      }))
  }

  // For some reason pressing enter in a text area does not submit the form, so I am using this to handle that case
  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.sendMessage(e);
    }
  }

  fetchMessages = () => {
    setTimeout(() =>{
      getMessages()
      .then((messages) => {
        this.setState({ messages })
        this.fetchMessages();
      });
    }, 1000)
  }
  componentDidMount() {
     this.fetchMessages()
  }

//https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  render() {
    const { user, messages, currentMessage } = this.state;
    return (
      <div className='chat-container'>
        <MessageList user={user} messages={messages}></MessageList>
        <form className='input-form' onSubmit={this.sendMessage}>
          <textarea value={currentMessage} onChange={this.updateCurrentMessage} onKeyDown={this.onEnterPress}>
          </textarea>
          <button type='submit' onClick={this.sendMessage}>Send</button>
        </form>
      </div>
    );
  }
}

export default App;
