import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    messages: []
  }
  postMessage = () => {
    fetch('http://localhost:5000/api/messages',
      { method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: "1234", message: "words" }),
      })
      .then((res) => res.json())
      .then(response => this.setState({messages: response}))
      .catch((err) => console.log(err))
  }
  render() {
    console.log(this.state.messages)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.postMessage}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
