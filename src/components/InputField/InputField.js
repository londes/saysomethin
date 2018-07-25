import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './InputField.css';

class InputField extends Component {
  constructor (props) {
    super (props);
    this.state = {
      textInput : "",
      textOutput : ""
    };
  };

  changeHandler = (event) => {
    this.setState({textInput : event.target.value});
  }

  submitHandle = (event) => {
    alert('something was submitted: ' + this.state.textInput);
    fetch(this.props.url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'msgText': this.state.textInput
      })
    })
      .then(res => {
        this.setState({vidLink: ""});
      })
      .catch(err => {
        console.error(err);
      });
  }

 render() {
  return (
    <form onSubmit={this.submitHandle}>
      <label>
        write something:
        <input type="text" value={this.state.textInput} onChange={this.changeHandler} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
 };
}

export default InputField;
