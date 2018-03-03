import React from 'react';
import ReactDOM from 'react-dom';

const Button = props => (
    <button className="menu-button" onClick={props.menuClick}>
      {props.menuName} Menu
    </button>
);

export default Button;