import React, { Component } from 'react';
import './App.css';

const postMessage = ({ message, user }) => {
  return fetch('http://localhost:5000/api/messages',
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
  return fetch('http://localhost:5000/api/messages')
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

class App extends Component {
  state = {
    messages: [],
    currentMessage: '',
    user: '12345!',
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

  scrollToBottom = () => {
    if (this.lastMessage) {
      this.lastMessage.scrollIntoView({ behavior: "smooth" });
    }
  }

  componentDidMount() {
    getMessages()
      .then((messages) => this.setState({
        messages
      }));
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

//https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  render() {
    const conversationElement = document.querySelector('.conversation');
    if (conversationElement) conversationElement.scrollTop = conversationElement.offsetHeight;
    return (
      <div className='chat-container'>
        <div className='conversation' style={{ overflow: 'auto' }}>
          {this.state.messages.map( (message, index, array) => {
              if (index + 1 === array.length) {
                return (
                  <div key={message.date} ref={el => this.lastMessage = el}>
                    { message.message }
                  </div>
                )
              }
              return (
                <div key={message.date}>
                  { message.message }
                </div>
              )
            })
          }
        </div>
        <form className='input-form' onSubmit={this.sendMessage}>
          <textarea value={this.state.currentMessage} onChange={this.updateCurrentMessage} onKeyDown={this.onEnterPress}>
          </textarea>
          <button type='submit' onClick={this.sendMessage}>Post</button>
        </form>
      </div>
    );
  }
}

export default App;
