import React, { Component } from 'react';
import './messageList.css';

export class MessageList extends Component {
  lastMessage = React.createRef();

  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  scrollToBottom = () => {
    if (this.lastMessage) {
      this.lastMessage.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        {messages.map((conversation, index, array) => {
          const { message, user: sendingUser, date, id } = conversation;
          const formattedDate = new Date(date).toDateString();
          const messageClasses = 'message' + (sendingUser === user ? ' sent-message' : ' received-message');
          // Saving reference of the last element in the message list so that we can scroll to it
          if (index + 1 === array.length) {
            return (
              <div
                className={messageClasses}
                key={id}
                ref={this.lastMessage}
              >
                {sendingUser !== user && <div className='user'>{sendingUser}</div>}
                <div>{message}</div>
                <div className='date'>{formattedDate}</div>
              </div>
            );
          }
          return (
            <div className={messageClasses} key={id}>
              {sendingUser !== user && <div className='user'>{sendingUser}</div>}
              <div>{message}</div>
              <div className='date'>{formattedDate}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
