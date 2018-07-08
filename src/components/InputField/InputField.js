import React, { Component, PropTypes } from 'react';
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
    alert('something was submitted: ' + this.state.textInput)
    event.preventDefault();

    // validation

    // do stuff

    // fetch(this.props.url, {
    //   method: 'POST',
    //   headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify({
    //     'embedUrl': embedUrl,
    //     'clipUrl': cleanVidLink,
    //     'clipId': clipId,
    //   })
    // })
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
