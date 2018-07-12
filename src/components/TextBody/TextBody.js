import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextBody.css';

class TextBody extends Component {
  static propTypes = {
    text: PropTypes.string
  }
  constructor (props) {
    super (props);
    this.state = {
    };
  };

 render() {
   return (<div>{this.props.text}</div>)
 }
}

export default TextBody;
