import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InputField from './components/InputField/InputField';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3001/');
console.log(socket);

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      textInput : "",
      textOutput : ""
    };
  };

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Say Something</h1>
          <InputField
            url="http://localhost:3001/forthesakeofit"
          />
        </header>
      </div>
    );
  }
}

export default App;
