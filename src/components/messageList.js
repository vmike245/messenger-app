import React, { Component } from 'react';
import './messageList.css';

export class MessageList extends Component {
  lastMessage = null;

  //https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  scrollToBottom = () => {
    if (this.lastMessage) {
      this.lastMessage.scrollIntoView({ behavior: "smooth" });
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { user, messages } = this.props;
    return (
      <div className='conversation'>
        { messages.map( (message, index, array) => {
          if (index + 1 === array.length) {
            return (
              <div className={ 'message' + (message.user === user ? ' sent-message' : ' received-message') } key={message.date} ref={el => this.lastMessage = el}>
                { message.user !== user &&
                  <div className='user'>
                    { message.user }
                  </div>
                }
                <div>
                  { message.message }
                </div>
                <div className='date'>
                  { new Date(message.date).toDateString() }
                </div>
              </div>
            )
          }
          return (
            <div className={ 'message' + (message.user === user ? ' sent-message' : ' received-message') } key={message.date}>
              { message.user !== user &&
                <div className='user'>
                  { message.user }
                </div>
              }
              <div>
                { message.message }
              </div>
              <div className='date'>
                { new Date(message.date).toDateString() }
              </div>
            </div>
          )
          })
        }
      </div>
    )
  }
}