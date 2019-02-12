import React, { Component } from 'react';
import './App.css';
import { MessageList } from './components/messageList';
import { postMessage, getMessages } from './services/messageService';

class App extends Component {
  constructor(props) {
    super(props);
    let user;
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      user = savedUser;
    } else {
      const newUsername = new Date().valueOf().toString();
      user = newUsername;
      localStorage.setItem('username', newUsername);
    }

    this.state = {
      messages: [],
      currentMessage: '',
      user,
    };
  }

  componentDidMount() {
    this.fetchMessages();
    this.pollForMessages();
  }

  updateCurrentMessage = event => {
    this.setState({
      currentMessage: event.target.value,
    });
  };
  sendMessage = event => {
    event.preventDefault();
    const { currentMessage, user } = this.state;
    postMessage({ message: currentMessage, user }).then(response =>
      this.setState({
        messages: response,
        currentMessage: '',
      })
    );
  };

  // For some reason pressing enter in a text area does not submit the form, so I am using this to handle that case
  onEnterPress = event => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      this.sendMessage(event);
    }
  };

  pollForMessages = () => {
    setTimeout(() => {
      this.fetchMessages()
        .then(() => {
          this.pollForMessages()
        })
    }, 2000);
  };

  fetchMessages = () => {
    return getMessages()
      .then(messages => {
        // Only update the messages if there is a new one or the message array is empty
        const lastItemInReturnedMessages = messages[messages.length - 1];
        const lastItemInCurrentMessages = this.state.messages[this.state.messages.length - 1];
        if (!lastItemInCurrentMessages || lastItemInReturnedMessages.id !== lastItemInCurrentMessages.id) {
          this.setState({ messages });
        }
      })
  }

  render() {
    const { user, messages, currentMessage } = this.state;
    return (
      <div className='chat-container'>
        {(!messages || messages.length === 0) && (
          <div className='no-messages'>
            <p>There are no messages in this conversation. Send one below to be the first!</p>
          </div>
        )}
        {messages.length > 0 && <MessageList user={user} messages={messages} />}
        <form className='input-form' onSubmit={this.sendMessage}>
          <textarea className='text-input' value={currentMessage} onChange={this.updateCurrentMessage} onKeyDown={this.onEnterPress} />
          <button type='submit' onClick={this.sendMessage}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default App;
